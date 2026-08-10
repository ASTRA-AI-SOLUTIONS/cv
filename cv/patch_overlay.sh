#!/bin/bash

# Modify data extraction
sed -i 's|const { education, experiences, skillCategories, certifications, projects: featuredProjects } = data;|const { hero, contact, education, experiences, skillCategories, featuredProjects } = data;|g' src/Overlay.tsx
sed -i 's|const { education, experiences, skillCategories, featuredProjects } = data;|const { hero, contact, education, experiences, skillCategories, featuredProjects } = data;|g' src/Overlay.tsx

# Patch Hero
sed -i 's|Ikshit <br/><span className="font-semibold text-blue-400">Joshi.</span>|{hero.name} <br/><span className="font-semibold text-blue-400">{hero.surname}</span>|g' src/Overlay.tsx
sed -i 's|Data Analyst and MIS Specialist with expertise in engineering high-throughput ETL pipelines and deploying AI-augmented data models.|{hero.subtitle}|g' src/Overlay.tsx
sed -i 's|Proven capability in architecting complex relational schemas and processing massive semi-structured datasets (100,000+ records) utilizing advanced algorithmic automation. Adept at rapid skill acquisition and leveraging state-of-the-art AI/ML models to optimize heuristic data validation.|{hero.description}|g' src/Overlay.tsx

# Patch Contact
sed -i 's|Delhi<br />|{contact.location}<br />|g' src/Overlay.tsx
sed -i 's|+91-9760915613|{contact.phone}|g' src/Overlay.tsx
sed -i 's|mailto:ikshitjoshi2@gmail.com|mailto:${contact.email}|g' src/Overlay.tsx

