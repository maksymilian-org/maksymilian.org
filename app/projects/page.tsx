import React, { FC } from "react";
import { Metadata } from "next";
import projects from "./data/projects.json";
import websites from "./data/websites.json";
import forfun from "./data/forfun.json";
import FadeIn from "../../components/fadein/FadeIn";
import TextBlock from "../../components/text-block/TextBlock";
import Links from "../../components/links/Links";
import Title from "../../components/title/Title";
import Section from "../../components/section/Section";

import styles from "./page.module.scss";

export const metadata: Metadata = {
  title: "Projects",
};

const Portfolio: FC = () => {
  return (
    <FadeIn>
      <Title>Last projects</Title>
      {projects.map((project) => (
        <Section key={project.title}>
          <TextBlock title={project.title} header>
            {project.description}
          </TextBlock>
          <TextBlock title="duration:">{project.time}</TextBlock>
          <TextBlock title="tasks:">
            <ul className={styles.tasks}>
              {project.tasks.map((task) => (
                <li key={task}>{task}</li>
              ))}
            </ul>
          </TextBlock>
          <TextBlock title="technologies:">{project.technologies}</TextBlock>
          <TextBlock title="framework:">{project.framework}</TextBlock>
          <TextBlock title="team:">{project.team}</TextBlock>
          <TextBlock title="links:">
            <Links links={project.links} />
          </TextBlock>
        </Section>
      ))}

      <Section>
        <Title>Websites</Title>
        <p>Before 2019 I created some websites.</p>
        <TextBlock>
          <Links links={websites} />
        </TextBlock>
      </Section>

      <Title>For fun</Title>
      <p>Sometimes I want to make things just for fun.</p>
      {forfun.map((project) => (
        <Section key={project.title}>
          <TextBlock title={project.title} header>
            {project.description}
          </TextBlock>
          <TextBlock title="technologies:">{project.technologies}</TextBlock>
          <TextBlock title="links:">
            <Links links={project.links} />
          </TextBlock>
        </Section>
      ))}
    </FadeIn>
  );
};

export default Portfolio;
