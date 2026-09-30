import React, { useState, useEffect } from 'react';
import { Project } from '../types/project';
import { 
  getProjectImageCandidates, 
  getRepositoryReadme, 
  extractFirstImageFromReadme,
  GITHUB_USERNAME 
} from '../services/github';
import { Image as ImageIcon, Github, Code2, Star } from 'lucide-react';

interface ProjectImageShowcaseProps {
  project: Project;
  variant?: 'card' | 'hero' | 'detail';
  className?: string;
}

export const ProjectImageShowcase: React.FC<ProjectImageShowcaseProps> = ({
  project,
  variant = 'card',
  className = '',
}) => {
  const [readmeImage, setReadmeImage] = useState<string | null>(null);
  const [candidateIndex, setCandidateIndex] = useState<number>(0);
  const [imageLoaded, setImageLoaded] = useState<boolean>(false);
  const [allFailed, setAllFailed] = useState<boolean>(false);

  // 1. Fetch README.md to extract the FIRST image link
  useEffect(() => {
    let isMounted = true;
    const repoName = project.repoName || project.id;
    const branch = project.defaultBranch || 'main';

    async function checkReadmeForCover() {
      try {
        const readmeContent = await getRepositoryReadme(repoName, branch);
        if (isMounted && readmeContent) {
          const firstImg = extractFirstImageFromReadme(readmeContent, repoName, branch);
          if (firstImg) {
            setReadmeImage(firstImg);
          }
        }
      } catch (e) {
        console.warn('Could not extract README cover image for', repoName, e);
      }
    }

    checkReadmeForCover();
    return () => { isMounted = false; };
  }, [project.id, project.repoName, project.defaultBranch]);

  // 2. Generate candidate list with README first image prioritized at index 0
  const candidates = getProjectImageCandidates(project, readmeImage);

  useEffect(() => {
    setCandidateIndex(0);
    setImageLoaded(false);
    setAllFailed(false);
  }, [project.id, project.updatedAt, readmeImage]);

  const handleImageError = () => {
    if (candidateIndex < candidates.length - 1) {
      setCandidateIndex(prev => prev + 1);
    } else {
      setAllFailed(true);
    }
  };

  const currentSrc = candidates[candidateIndex];

  // If real image loaded successfully
  if (!allFailed && currentSrc) {
    return (
      <div className={`relative w-full h-full overflow-hidden bg-neutral-950 flex items-center justify-center select-none ${className}`}>
        {/* Loading placeholder while checking candidate images */}
        {!imageLoaded && (
          <div className="absolute inset-0 bg-slate-900/60 dark:bg-neutral-900/60 flex items-center justify-center animate-pulse">
            <div className="flex items-center gap-2 text-xs font-mono text-neutral-400">
              <ImageIcon className="w-4 h-4 animate-spin text-neutral-500" />
              <span>Loading cover...</span>
            </div>
          </div>
        )}

        <img
          src={currentSrc}
          alt={`${project.name} preview`}
          onLoad={() => setImageLoaded(true)}
          onError={handleImageError}
          className={`w-full h-full object-cover object-top transition-all duration-300 ${
            imageLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
          }`}
          loading="lazy"
        />

        {/* GitHub Asset / README Cover Badge */}
        {imageLoaded && (
          <div className="absolute top-2 left-2 pointer-events-none">
            <span className="px-2 py-0.5 rounded-md text-[10px] font-mono font-medium bg-black/75 text-neutral-200 border border-white/10 backdrop-blur-sm shadow-sm flex items-center gap-1">
              <Github className="w-2.5 h-2.5 text-neutral-400" />
              {currentSrc === readmeImage 
                ? 'README Cover' 
                : currentSrc.includes('opengraph') 
                  ? 'GitHub Preview' 
                  : 'Project Asset'}
            </span>
          </div>
        )}
      </div>
    );
  }

  // Clean fallback when repository has no screenshot or image in README yet
  return (
    <div className={`w-full h-full bg-[#0e1117] text-neutral-200 flex flex-col justify-between p-4 font-sans select-none overflow-hidden ${className}`}>
      {/* Top Bar of Fallback */}
      <div className="flex items-center justify-between text-xs text-neutral-400 border-b border-neutral-800/80 pb-2">
        <div className="flex items-center gap-1.5 font-mono text-[11px]">
          <Github className="w-3.5 h-3.5 text-neutral-400" />
          <span className="text-neutral-300 font-semibold">{GITHUB_USERNAME}</span>
          <span className="text-neutral-600">/</span>
          <span className="text-white font-bold">{project.repoName}</span>
        </div>
        {project.stars > 0 && (
          <div className="flex items-center gap-1 text-[11px] font-mono text-amber-400">
            <Star className="w-3 h-3 fill-amber-400" />
            <span>{project.stars}</span>
          </div>
        )}
      </div>

      {/* Center Details */}
      <div className="py-3 flex flex-col justify-center items-center text-center">
        <div className="w-10 h-10 rounded-xl bg-neutral-900 border border-neutral-800 flex items-center justify-center text-neutral-300 mb-2 shadow-inner">
          <Code2 className="w-5 h-5 text-neutral-400" />
        </div>
        <div className="text-xs font-semibold text-white tracking-tight">{project.name}</div>
        <p className="text-[11px] text-neutral-400 mt-1 max-w-xs line-clamp-2 leading-relaxed">
          {project.description}
        </p>
      </div>

      {/* Bottom info */}
      <div className="flex items-center justify-between text-[10px] font-mono text-neutral-500 pt-2 border-t border-neutral-800/60">
        <span>{project.primaryLanguage || project.category}</span>
        <span className="text-neutral-400">branch: {project.defaultBranch}</span>
      </div>
    </div>
  );
};
