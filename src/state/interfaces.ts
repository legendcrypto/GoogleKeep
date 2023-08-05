export interface Note {
    title?: string;
    description: string;
    isPinned: boolean;
    makePinned?: boolean;
    color: string;
    newColor? : string;
}
