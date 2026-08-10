import { db } from './firebase';
import { doc, getDoc, setDoc, onSnapshot } from 'firebase/firestore';
import { defaultData } from './data';

const RESUME_DOC_ID = 'main_resume';
const COLLECTION = 'resumes';

export const getResumeRef = () => doc(db, COLLECTION, RESUME_DOC_ID);

function mergeWithDefault(data: any): typeof defaultData {
  return {
    hero: { ...defaultData.hero, ...data?.hero },
    contact: { ...defaultData.contact, ...data?.contact },
    featuredProjects: data?.featuredProjects || defaultData.featuredProjects,
    education: data?.education || defaultData.education,
    experiences: data?.experiences || defaultData.experiences,
    skillCategories: data?.skillCategories || defaultData.skillCategories,
  };
}

export async function fetchResumeData() {
  const ref = getResumeRef();
  try {
    const snap = await getDoc(ref);
    if (!snap.exists()) {
      return defaultData;
    }
    return mergeWithDefault(snap.data());
  } catch (err) {
    console.error("Error fetching data:", err);
    return defaultData; // fallback
  }
}

export function subscribeToResumeData(callback: (data: typeof defaultData) => void) {
  const ref = getResumeRef();
  return onSnapshot(ref, (snap) => {
    if (snap.exists()) {
      callback(mergeWithDefault(snap.data()));
    }
  }, (error) => {
    console.error("Snapshot error:", error);
  });
}

export async function saveResumeData(data: typeof defaultData) {
  const ref = getResumeRef();
  await setDoc(ref, data);
}
