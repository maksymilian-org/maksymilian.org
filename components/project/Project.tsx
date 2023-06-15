import React, { FC } from "react";
import { ProjectCategory } from "../../enums/ProjectCategory";
import Section from "../section/Section";
import TextBlock from "../text-block/TextBlock";
import Links from "../links/Links";

import styles from "./Project.module.scss";

interface Link {
  id: number;
  url: string;
  title: string;
}

interface Task {
  id: number;
  description: string;
}

export interface IProject {
  id: number;
  attributes: {
    title: string;
    description: string;
    time: string;
    technologies: string;
    framework: string;
    team: string;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
    locale: string;
    category: ProjectCategory;
    links: Link[];
    tasks: Task[];
    localizations: {
      data: string[];
    };
  };
}

const Project: FC<{ project: IProject }> = ({ project }) => {
  const {
    title,
    description,
    time,
    tasks,
    technologies,
    framework,
    team,
    links,
  } = project.attributes;

  return (
    <Section key={project.id}>
      {title && description && (
        <TextBlock title={title} header>
          {description}
        </TextBlock>
      )}
      {time && <TextBlock title="duration:">{time}</TextBlock>}
      {tasks && Boolean(tasks.length) && (
        <TextBlock title="tasks:">
          <ul className={styles.tasks}>
            {tasks.map((task) => (
              <li key={task.id}>{task.description}</li>
            ))}
          </ul>
        </TextBlock>
      )}
      {technologies && (
        <TextBlock title="technologies:">{technologies}</TextBlock>
      )}
      {framework && <TextBlock title="framework:">{framework}</TextBlock>}
      {team && <TextBlock title="team:">{team}</TextBlock>}
      {links && Boolean(links.length) && (
        <TextBlock title="links:">
          <Links links={links} />
        </TextBlock>
      )}
    </Section>
  );
};

export default Project;
