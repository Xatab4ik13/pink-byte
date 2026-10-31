import { describe, expect, it } from 'vitest';
import { initialReviews, pendingReviews, resolveReview } from '@/components/admin/agents-model';

describe('CRM agent draft reviews', () => {
  it('starts with two materials awaiting a decision', () => {
    expect(pendingReviews(initialReviews)).toHaveLength(2);
  });
  it('approves one draft without approving the other', () => {
    const result = resolveReview(initialReviews, 'proposal', 'approved', '');
    expect(pendingReviews(result).map(review => review.id)).toEqual(['article']);
    expect(result[0]?.status).toBe('approved');
    expect(initialReviews[0]?.status).toBe('pending');
  });
  it('requires a comment when returning a draft', () => {
    expect(resolveReview(initialReviews, 'proposal', 'returned', '   ')).toBe(initialReviews);
  });
  it('keeps the reviewer comment with a returned draft', () => {
    expect(resolveReview(initialReviews, 'proposal', 'returned', ' Уточнить интеграции ')[0]).toMatchObject({ status: 'returned', comment: 'Уточнить интеграции' });
  });
});