// src/api.ts
import type { About, Contact, Education, Project, Skills } from "./types/types";

const BASE_URL = "https://riyapatel-portfolio.onrender.com/";

export async function fetchAbout(): Promise<About> {
  const res = await fetch(`${BASE_URL}/about`);
  if (!res.ok) throw new Error("Failed to fetch About");
  return res.json();
}

export async function fetchProjects(): Promise<Project[]> {
  const res = await fetch(`${BASE_URL}/projects`);
  if (!res.ok) throw new Error("Failed to fetch Projects");
  return res.json();
}

// export async function fetchEmployment(): Promise<Employment[]> {
//   const res = await fetch(`${BASE_URL}/employment`);
//   if (!res.ok) throw new Error("Failed to fetch Employment");
//   return res.json();
// }

export async function fetchEducation(): Promise<Education[]> {
  const res = await fetch(`${BASE_URL}/education`);
  if (!res.ok) throw new Error("Failed to fetch Education");
  return res.json();
}

export async function fetchSkills(): Promise<Skills[]> {
  const res = await fetch(`${BASE_URL}/skills`);
  if (!res.ok) throw new Error("Failed to fetch Skills");
  return res.json();
}

export async function fetchContact(): Promise<Contact> {
  const res = await fetch(`${BASE_URL}/contact`);
  if (!res.ok) throw new Error("Failed to fetch Contact");
  return res.json();
}

export async function sendContact(formData: { name: string; email: string; message: string }) {
  const res = await fetch(`${BASE_URL}/contact`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(formData),
  });
  return res.json();
}
