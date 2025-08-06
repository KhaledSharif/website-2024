import { getAllNotes, getNoteBySlug, notes } from '@/lib/notes-data';

describe('Notes Data', () => {
  describe('getAllNotes', () => {
    it('should return all notes', () => {
      const result = getAllNotes();
      expect(result).toBe(notes);
      expect(result).toHaveLength(notes.length);
    });

    it('should return notes with correct structure', () => {
      const result = getAllNotes();
      const firstNote = result[0];
      
      expect(firstNote).toHaveProperty('slug');
      expect(firstNote).toHaveProperty('name');
      expect(firstNote).toHaveProperty('description');
      expect(firstNote).toHaveProperty('title');
      expect(firstNote).toHaveProperty('titleIcon');
      expect(firstNote).toHaveProperty('breadcrumbLabel');
    });
  });

  describe('getNoteBySlug', () => {
    it('should return note for valid slug', () => {
      const result = getNoteBySlug('slam-sota');
      expect(result).toBeDefined();
      expect(result?.slug).toBe('slam-sota');
      expect(result?.name).toBe('SLAM Overview');
    });

    it('should return undefined for invalid slug', () => {
      const result = getNoteBySlug('non-existent');
      expect(result).toBeUndefined();
    });

    it('should return correct note for each slug', () => {
      const slugs = ['slam-sota', 'auto-nav', 'bev', 'nerfs'];
      
      slugs.forEach(slug => {
        const result = getNoteBySlug(slug);
        expect(result).toBeDefined();
        expect(result?.slug).toBe(slug);
      });
    });
  });

  describe('notes array', () => {
    it('should have unique slugs', () => {
      const slugs = notes.map(n => n.slug);
      const uniqueSlugs = new Set(slugs);
      expect(slugs.length).toBe(uniqueSlugs.size);
    });

    it('should have required properties for each note', () => {
      notes.forEach(note => {
        expect(note.slug).toBeTruthy();
        expect(note.name).toBeTruthy();
        expect(note.description).toBeTruthy();
        expect(note.title).toBeTruthy();
        expect(note.titleIcon).toBeTruthy();
        expect(note.breadcrumbLabel).toBeTruthy();
      });
    });

    it('should have auto-nav with header image', () => {
      const autoNav = getNoteBySlug('auto-nav');
      expect(autoNav?.hasHeaderImage).toBe(true);
      expect(autoNav?.headerImageSrc).toBe('/images/auto-nav.jpg');
      expect(autoNav?.headerImageAlt).toBe('robots');
    });

    it('should have nerfs with header image', () => {
      const nerfs = getNoteBySlug('nerfs');
      expect(nerfs?.hasHeaderImage).toBe(true);
      expect(nerfs?.headerImageSrc).toBe('/images/nerf.png');
      expect(nerfs?.headerImageAlt).toBe('robots');
    });

    it('should have slam-sota and bev without header images', () => {
      const slamSota = getNoteBySlug('slam-sota');
      const bev = getNoteBySlug('bev');
      
      expect(slamSota?.hasHeaderImage).toBeUndefined();
      expect(bev?.hasHeaderImage).toBeUndefined();
    });
  });
}); 