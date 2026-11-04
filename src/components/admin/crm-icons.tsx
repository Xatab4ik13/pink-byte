import type { SVGProps } from 'react';

/* Pink Byte CRM icon set: 24px grid, 1.75 stroke, rounded joins, one lime accent shape per icon. */
type IconProps = SVGProps<SVGSVGElement>;
const Base = ({ children, ...props }: IconProps) => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="pb-icon" {...props}>{children}</svg>;
const Accent = (props: SVGProps<SVGRectElement>) => <rect className="pb-icon-accent" stroke="none" {...props} />;

export const IconTasks = (p: IconProps) => <Base {...p}><Accent x="3.5" y="4.5" width="5" height="5" rx="1.5" /><path d="M4.5 7l1.2 1.2L8 5.8" /><path d="M11.5 7h9M11.5 12h9M11.5 17h6" /><rect x="3.5" y="14.5" width="5" height="5" rx="1.5" /></Base>;
export const IconLead = (p: IconProps) => <Base {...p}><path d="M4 7.5A2.5 2.5 0 016.5 5h11A2.5 2.5 0 0120 7.5v7a2.5 2.5 0 01-2.5 2.5H11l-4 3v-3h-.5A2.5 2.5 0 014 14.5z" /><Accent x="8" y="9" width="8" height="2" rx="1" /><path d="M8 13h4.5" /></Base>;
export const IconCoins = (p: IconProps) => <Base {...p}><ellipse cx="9.5" cy="7" rx="5.5" ry="2.5" /><path d="M4 7v4c0 1.4 2.5 2.5 5.5 2.5M4 11v4c0 1.4 2.5 2.5 5.5 2.5" /><circle className="pb-icon-accent" stroke="none" cx="16" cy="15" r="4.5" /><circle cx="16" cy="15" r="4.5" /><path d="M16 13.2v3.6" /></Base>;
export const IconReview = (p: IconProps) => <Base {...p}><path d="M12 3.5l7 2.6v5.4c0 4.2-2.9 7.6-7 9-4.1-1.4-7-4.8-7-9V6.1z" /><circle className="pb-icon-accent" stroke="none" cx="12" cy="11.5" r="3.6" /><path d="M10.4 11.6l1.2 1.2 2.2-2.4" /></Base>;
export const IconFolder = (p: IconProps) => <Base {...p}><path d="M3.5 7.5A2 2 0 015.5 5.5h3.8l2 2h7.2a2 2 0 012 2v7.5a2 2 0 01-2 2h-13a2 2 0 01-2-2z" /><Accent x="3.5" y="10" width="17" height="2.2" rx="1.1" /></Base>;
export const IconArrow = (p: IconProps) => <Base strokeWidth={2} {...p}><path d="M5 12h13M13 6.5L18.5 12 13 17.5" /></Base>;
export const IconPlus = (p: IconProps) => <Base strokeWidth={2.1} {...p}><path d="M12 5.5v13M5.5 12h13" /></Base>;
export const IconMore = (p: IconProps) => <Base {...p}><circle cx="6" cy="12" r="1.3" fill="currentColor" /><circle cx="12" cy="12" r="1.3" fill="currentColor" /><circle cx="18" cy="12" r="1.3" fill="currentColor" /></Base>;
export const IconCheck = (p: IconProps) => <Base strokeWidth={2.4} {...p}><path className="pb-check-path" d="M5.5 12.5l4 4 9-9.5" pathLength={1} /></Base>;
export const IconUser = (p: IconProps) => <Base {...p}><circle className="pb-icon-accent" stroke="none" cx="12" cy="8.5" r="3.5" /><circle cx="12" cy="8.5" r="3.5" /><path d="M5.5 19.5c.8-3.3 3.4-5 6.5-5s5.7 1.7 6.5 5" /></Base>;
export const IconContract = (p: IconProps) => <Base {...p}><path d="M6 3.5h8l4 4v13H6z" /><path d="M14 3.5v4h4" /><path d="M9 11h6M9 14h3" /><path className="pb-icon-accent-stroke" d="M9 18c1-1.4 1.8-1.4 2.4 0 .6 1 1.3 1 2.4-.4" /></Base>;
export const IconDecline = (p: IconProps) => <Base {...p}><circle cx="12" cy="12" r="8" /><path d="M9.2 9.2l5.6 5.6M14.8 9.2l-5.6 5.6" /></Base>;
export const IconDoc = (p: IconProps) => <Base {...p}><path d="M6.5 3.5h7l4 4v12a1 1 0 01-1 1h-10a1 1 0 01-1-1v-15a1 1 0 011-1z" /><path d="M13.5 3.5v4h4" /><Accent x="8.5" y="12" width="7" height="2" rx="1" /><path d="M8.5 16.5h4.5" /></Base>;
export const IconSpark = (p: IconProps) => <Base {...p}><path className="pb-icon-accent" stroke="none" d="M12 3.5l1.9 5.2 5.1 1.9-5.1 1.9L12 17.7l-1.9-5.2L5 10.6l5.1-1.9z" /><path d="M12 3.5l1.9 5.2 5.1 1.9-5.1 1.9L12 17.7l-1.9-5.2L5 10.6l5.1-1.9z" /><path d="M18.5 16.5v3M17 18h3" /></Base>;
