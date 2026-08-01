'use client';

import {useState} from 'react';
import {useTranslations} from 'next-intl';
import {projects} from '@/data/projects';
import type {ProjectCategory} from '@/types';
import Card from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';
import Modal from '@/components/ui/Modal';
import Section from '@/components/ui/Section';

type FilterTranslationKey = 'all' | 'web' | 'mobile' | 'bot' | 'miniApp' | 'design';

const FILTERS: FilterTranslationKey[] = ['all', 'web', 'mobile', 'bot', 'miniApp', 'design'];

const FILTER_TO_CATEGORY: Record<FilterTranslationKey, ProjectCategory | 'all'> = {
  all: 'all',
  web: 'web',
  mobile: 'mobile',
  bot: 'bot',
  miniApp: 'mini-app',
  design: 'design'
};

export default function Projects() {
  const t = useTranslations('projects');
  const [activeFilter, setActiveFilter] = useState<FilterTranslationKey>('all');
  const [selectedProject, setSelectedProject] = useState<typeof projects[number] | null>(null);

  const filteredCategory = FILTER_TO_CATEGORY[activeFilter];
  const filtered = filteredCategory === 'all'
    ? projects
    : projects.filter((p) => p.category === filteredCategory);

  return (
    <Section id="projects" className="bg-[var(--bg-secondary)]">
      <div className="mb-12 text-center">
        <h2 className="text-3xl font-bold text-[var(--text-primary)]">
          {t('title')}
        </h2>
        <p className="mt-2 text-[var(--text-secondary)]">{t('subtitle')}</p>
      </div>

      <div className="mb-8 flex flex-wrap items-center justify-center gap-2">
        {FILTERS.map((filter) => (
          <button
            key={filter}
            onClick={() => setActiveFilter(filter)}
            className={`rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${
              activeFilter === filter
                ? 'bg-[var(--accent)] text-[var(--bg-primary)]'
                : 'border border-[var(--border-default)] bg-[var(--bg-elevated)] text-[var(--text-secondary)] hover:border-[var(--accent)] hover:text-[var(--accent)]'
            }`}
          >
            {t(`filters.${filter}`)}
          </button>
        ))}
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((project) => (
          <Card
            key={project.id}
            hover
            onClick={() => setSelectedProject(project)}
          >
            <div className="mb-3 flex items-center justify-between">
              <Badge variant="accent">
                {t(`filters.${project.category === 'mini-app' ? 'miniApp' : project.category}`)}
              </Badge>
              <span className="text-xs text-[var(--text-muted)]">
                {project.duration}
              </span>
            </div>
            <h3 className="mb-2 text-lg font-semibold text-[var(--text-primary)]">
              {project.client}
            </h3>
            <p className="mb-4 line-clamp-2 text-sm text-[var(--text-secondary)]">
              {project.summary}
            </p>
            <div className="flex flex-wrap gap-1.5">
              {project.stack.slice(0, 4).map((tech) => (
                <Badge key={tech}>{tech}</Badge>
              ))}
              {project.stack.length > 4 && (
                <Badge>+{project.stack.length - 4}</Badge>
              )}
            </div>
          </Card>
        ))}
      </div>

      <Modal
        open={!!selectedProject}
        onClose={() => setSelectedProject(null)}
        title={selectedProject?.client}
      >
        {selectedProject && (
          <div className="space-y-6">
            <div>
              <h3 className="mb-2 text-sm font-semibold uppercase tracking-wider text-[var(--text-muted)]">
                {t('card.duration')}
              </h3>
              <p className="text-[var(--text-primary)]">{selectedProject.duration}</p>
            </div>

            <div>
              <h3 className="mb-2 text-sm font-semibold uppercase tracking-wider text-[var(--text-muted)]">
                {t('modal.stack')}
              </h3>
              <div className="flex flex-wrap gap-2">
                {selectedProject.stack.map((tech) => (
                  <Badge key={tech} variant="accent">
                    {tech}
                  </Badge>
                ))}
              </div>
            </div>

            <div>
              <h3 className="mb-2 text-sm font-semibold uppercase tracking-wider text-[var(--text-muted)]">
                {t('modal.architecture')}
              </h3>
              <p className="text-sm leading-relaxed text-[var(--text-secondary)]">
                {selectedProject.architecture}
              </p>
            </div>

            <div>
              <h3 className="mb-2 text-sm font-semibold uppercase tracking-wider text-[var(--text-muted)]">
                {t('modal.challenges')}
              </h3>
              <ul className="space-y-2">
                {selectedProject.challenges.map((challenge) => (
                  <li
                    key={challenge}
                    className="flex items-start gap-2 text-sm text-[var(--text-secondary)]"
                  >
                    <span className="mt-1 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-[var(--accent)]" />
                    {challenge}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </Modal>
    </Section>
  );
}
