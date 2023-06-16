import React from "react";
import { Metadata } from "next";
import websites from "./data/websites.json";
import FadeIn from "../../components/fadein/FadeIn";
import Project, { IProject } from "../../components/project/Project";
import TextBlock from "../../components/text-block/TextBlock";
import Links from "../../components/links/Links";
import Title from "../../components/title/Title";
import Section from "../../components/section/Section";
import getData from "../../utils/getData";
import { ProjectCategory } from "../../enums/ProjectCategory";

export const metadata: Metadata = {
  title: "Projects",
};

const Projects = async () => {
  const params = new URLSearchParams({ populate: "*", sort: "date:desc" });
  const data: { data: IProject[] } = await getData("projects", params);

  const commercial = data.data.filter(
    (project) => project.attributes.category === ProjectCategory.commercial
  );

  const own = data.data.filter(
    (project) => project.attributes.category === ProjectCategory.own
  );

  return (
    <FadeIn>
      <Title>Last projects</Title>
      {commercial.map((project) => (
        <Project key={project.id} project={project} />
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
      {own.map((project) => (
        <Project key={project.id} project={project} />
      ))}
    </FadeIn>
  );
};

export default Projects;
