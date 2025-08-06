import { getAllProjects, getProjectBySlug, projects } from '@/lib/projects-data';

describe('Projects Data', () => {
  describe('getAllProjects', () => {
    it('should return all projects', () => {
      const result = getAllProjects();
      expect(result).toBe(projects);
      expect(result).toHaveLength(projects.length);
    });

    it('should return projects with correct structure', () => {
      const result = getAllProjects();
      const firstProject = result[0];
      
      expect(firstProject).toHaveProperty('slug');
      expect(firstProject).toHaveProperty('name');
      expect(firstProject).toHaveProperty('description');
      expect(firstProject).toHaveProperty('title');
      expect(firstProject).toHaveProperty('titleIcon');
      expect(firstProject).toHaveProperty('breadcrumbLabel');
    });
  });

  describe('getProjectBySlug', () => {
    it('should return project for valid slug', () => {
      const result = getProjectBySlug('astrobee');
      expect(result).toBeDefined();
      expect(result?.slug).toBe('astrobee');
      expect(result?.name).toBe('Astrobee');
    });

    it('should return undefined for invalid slug', () => {
      const result = getProjectBySlug('non-existent');
      expect(result).toBeUndefined();
    });

    it('should return correct project for each slug', () => {
      const slugs = ['astrobee', 'ros-vslam', 'omniverse-gym', 'robot-transformers'];
      
      slugs.forEach(slug => {
        const result = getProjectBySlug(slug);
        expect(result).toBeDefined();
        expect(result?.slug).toBe(slug);
      });
    });
  });

  describe('projects array', () => {
    it('should have unique slugs', () => {
      const slugs = projects.map(p => p.slug);
      const uniqueSlugs = new Set(slugs);
      expect(slugs.length).toBe(uniqueSlugs.size);
    });

    it('should have required properties for each project', () => {
      projects.forEach(project => {
        expect(project.slug).toBeTruthy();
        expect(project.name).toBeTruthy();
        expect(project.description).toBeTruthy();
        expect(project.title).toBeTruthy();
        expect(project.titleIcon).toBeTruthy();
        expect(project.breadcrumbLabel).toBeTruthy();
      });
    });

    it('should have astrobee with carousel items', () => {
      const astrobee = getProjectBySlug('astrobee');
      expect(astrobee?.hasCarousel).toBe(true);
      expect(astrobee?.carouselItems).toBeDefined();
      expect(astrobee?.carouselItems?.length).toBeGreaterThan(0);
    });

    it('should have ros-vslam with accordion and animated beam', () => {
      const rosVSLAM = getProjectBySlug('ros-vslam');
      expect(rosVSLAM?.hasAccordion).toBe(true);
      expect(rosVSLAM?.hasAnimatedBeam).toBe(true);
    });

    it('should have omniverse-gym and robot-transformers with videos', () => {
      const omniverseGym = getProjectBySlug('omniverse-gym');
      const robotTransformers = getProjectBySlug('robot-transformers');
      
      expect(omniverseGym?.hasVideo).toBe(true);
      expect(robotTransformers?.hasVideo).toBe(true);
    });
  });
}); 