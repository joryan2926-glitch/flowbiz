"use client";


import "./academy.css";


import { useMemo, useState } from "react";
import {
  BookOpen,
  Search,
  Plus,
  PlayCircle,
  CheckCircle2,
  Clock3,
  Users,
  Star,
  Award,
  Download,
  FileText,
  Video,
  Lock,
  Unlock,
  Filter,
  Trash2,
  Edit3,
  Save,
  X,
  Loader2,
  Sparkles,
} from "lucide-react";


type CourseStatus = "Disponible" | "En cours" | "Terminé" | "Verrouillé";


type Course = {
  id: string;
  title: string;
  category: string;
  level: string;
  duration: string;
  status: CourseStatus;
  progress: number;
  lessons: number;
  students: number;
  description: string;
};


const initialCourses: Course[] = [
  {
    id: "ACD-001",
    title: "Créer son entreprise avec méthode",
    category: "Entrepreneuriat",
    level: "Débutant",
    duration: "4h",
    status: "Disponible",
    progress: 0,
    lessons: 8,
    students: 124,
    description: "Bases juridiques, stratégie, offre, positionnement et premières actions.",
  },
  {
    id: "ACD-002",
    title: "Automatiser son business avec l’IA",
    category: "IA & Automatisation",
    level: "Intermédiaire",
    duration: "6h",
    status: "En cours",
    progress: 45,
    lessons: 12,
    students: 89,
    description: "Cas pratiques IA, productivité, automatisations et assistants business.",
  },
  {
    id: "ACD-003",
    title: "Maîtriser FlowBiz",
    category: "FlowBiz",
    level: "Débutant",
    duration: "3h",
    status: "Terminé",
    progress: 100,
    lessons: 7,
    students: 211,
    description: "CRM, facturation, finance, analytics, abonnements et parcours utilisateur.",
  },
];


export default function AcademyDashboardPage() {
  const [courses, setCourses] = useState<Course[]>(initialCourses);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("Tous");
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [saving, setSaving] = useState(false);


  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("Entrepreneuriat");
  const [level, setLevel] = useState("Débutant");
  const [duration, setDuration] = useState("");
  const [description, setDescription] = useState("");


  const filteredCourses = useMemo(() => {
    return courses.filter((course) => {
      const matchesSearch =
        course.title.toLowerCase().includes(search.toLowerCase()) ||
        course.category.toLowerCase().includes(search.toLowerCase());


      const matchesFilter = filter === "Tous" || course.status === filter;


      return matchesSearch && matchesFilter;
    });
  }, [courses, search, filter]);


  const totalCourses = courses.length;
  const activeCourses = courses.filter((c) => c.status === "En cours").length;
  const finishedCourses = courses.filter((c) => c.status === "Terminé").length;
  const totalStudents = courses.reduce((acc, c) => acc + c.students, 0);
  const averageProgress =
    courses.length > 0
      ? Math.round(courses.reduce((acc, c) => acc + c.progress, 0) / courses.length)
      : 0;


  function resetForm() {
    setTitle("");
    setCategory("Entrepreneuriat");
    setLevel("Débutant");
    setDuration("");
    setDescription("");
  }


  async function addCourse(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();


    if (!title || !duration || !description) {
      alert("Titre, durée et description sont obligatoires.");
      return;
    }


    setSaving(true);


    const newCourse: Course = {
      id: `ACD-${Date.now()}`,
      title,
      category,
      level,
      duration,
      status: "Disponible",
      progress: 0,
      lessons: 1,
      students: 0,
      description,
    };


    setCourses((prev) => [newCourse, ...prev]);


    setTimeout(() => {
      setSaving(false);
      setShowForm(false);
      resetForm();
    }, 500);
  }


  function startCourse(courseId: string) {
    setCourses((prev) =>
      prev.map((course) =>
        course.id === courseId
          ? {
              ...course,
              status: course.status === "Verrouillé" ? "Verrouillé" : "En cours",
              progress: course.status === "Verrouillé" ? course.progress : Math.max(course.progress, 10),
            }
          : course
      )
    );
  }


  function validateLesson(courseId: string) {
    setCourses((prev) =>
      prev.map((course) => {
        if (course.id !== courseId || course.status === "Verrouillé") return course;


        const nextProgress = Math.min(course.progress + 20, 100);


        return {
          ...course,
          progress: nextProgress,
          status: nextProgress >= 100 ? "Terminé" : "En cours",
        };
      })
    );
  }


  function unlockCourse(courseId: string) {
    setCourses((prev) =>
      prev.map((course) =>
        course.id === courseId
          ? {
              ...course,
              status: "Disponible",
            }
          : course
      )
    );
  }


  function deleteCourse(courseId: string) {
    const ok = confirm("Supprimer cette formation ?");
    if (!ok) return;


    setCourses((prev) => prev.filter((course) => course.id !== courseId));


    if (selectedCourse?.id === courseId) {
      setSelectedCourse(null);
    }
  }


  function exportAcademyData() {
    const data = {
      generated_at: new Date().toISOString(),
      totalCourses,
      activeCourses,
      finishedCourses,
      totalStudents,
      averageProgress,
      courses,
    };


    const blob = new Blob([JSON.stringify(data, null, 2)], {
      type: "application/json",
    });


    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");


    a.href = url;
    a.download = "flowbiz-academy-export.json";
    a.click();


    URL.revokeObjectURL(url);
  }


  return (
    <main className="academyPage">
      <header className="academyHeader">
        <div>
          <span className="academyBadge">
            <Sparkles size={15} />
            FLOWBIZ ACADEMY
          </span>


          <h1>Academy Dashboard</h1>


          <p>
            Gérez les formations, modules, progression utilisateur, accès,
            validation des leçons et exports pédagogiques.
          </p>
        </div>


        <div className="academyHeaderActions">
          <button onClick={exportAcademyData} className="academyGhostBtn">
            <Download size={18} />
            Export
          </button>


          <button onClick={() => setShowForm(true)} className="academyPrimaryBtn">
            <Plus size={18} />
            Nouvelle formation
          </button>
        </div>
      </header>


      <section className="academyStats">
        <div className="academyStatCard">
          <BookOpen />
          <div>
            <strong>{totalCourses}</strong>
            <span>Formations</span>
          </div>
        </div>


        <div className="academyStatCard">
          <PlayCircle />
          <div>
            <strong>{activeCourses}</strong>
            <span>En cours</span>
          </div>
        </div>


        <div className="academyStatCard">
          <Award />
          <div>
            <strong>{finishedCourses}</strong>
            <span>Terminées</span>
          </div>
        </div>


        <div className="academyStatCard">
          <Users />
          <div>
            <strong>{totalStudents}</strong>
            <span>Apprenants</span>
          </div>
        </div>


        <div className="academyStatCard">
          <Star />
          <div>
            <strong>{averageProgress}%</strong>
            <span>Progression moyenne</span>
          </div>
        </div>
      </section>


      <section className="academyToolbar">
        <div className="academySearch">
          <Search size={18} />
          <input
            type="text"
            placeholder="Rechercher une formation..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>


        <div className="academyFilter">
          <Filter size={18} />
          <select value={filter} onChange={(e) => setFilter(e.target.value)}>
            <option>Tous</option>
            <option>Disponible</option>
            <option>En cours</option>
            <option>Terminé</option>
            <option>Verrouillé</option>
          </select>
        </div>
      </section>


      {showForm && (
        <section className="academyFormCard">
          <div className="academyFormTop">
            <h2>Nouvelle formation</h2>


            <button onClick={() => setShowForm(false)}>
              <X size={18} />
            </button>
          </div>


          <form onSubmit={addCourse} className="academyForm">
            <input
              type="text"
              placeholder="Titre de la formation"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />


            <select value={category} onChange={(e) => setCategory(e.target.value)}>
              <option>Entrepreneuriat</option>
              <option>IA & Automatisation</option>
              <option>Marketing digital</option>
              <option>FlowBiz</option>
              <option>Gestion d’entreprise</option>
            </select>


            <select value={level} onChange={(e) => setLevel(e.target.value)}>
              <option>Débutant</option>
              <option>Intermédiaire</option>
              <option>Avancé</option>
            </select>


            <input
              type="text"
              placeholder="Durée ex : 4h"
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
            />


            <textarea
              placeholder="Description de la formation"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />


            <button type="submit" disabled={saving}>
              {saving ? <Loader2 className="spin" /> : <Save size={18} />}
              Enregistrer
            </button>
          </form>
        </section>
      )}


      <section className="academyGrid">
        <div className="academyCourses">
          {filteredCourses.map((course) => (
            <article key={course.id} className="academyCourseCard">
              <div className="academyCourseTop">
                <div className="academyCourseIcon">
                  {course.status === "Verrouillé" ? <Lock /> : <BookOpen />}
                </div>


                <div>
                  <h3>{course.title}</h3>
                  <p>{course.description}</p>
                </div>
              </div>


              <div className="academyMeta">
                <span>{course.category}</span>
                <span>{course.level}</span>
                <span>{course.duration}</span>
                <span>{course.lessons} leçon(s)</span>
              </div>


              <div className="academyProgress">
                <div>
                  <span>Progression</span>
                  <strong>{course.progress}%</strong>
                </div>


                <div className="academyProgressBar">
                  <div style={{ width: `${course.progress}%` }} />
                </div>
              </div>


              <div className="academyCourseFooter">
                <span className={`academyStatus ${course.status.replace(" ", "")}`}>
                  {course.status}
                </span>


                <div className="academyCourseActions">
                  <button onClick={() => setSelectedCourse(course)}>
                    <FileText size={16} />
                  </button>


                  <button onClick={() => startCourse(course.id)}>
                    <PlayCircle size={16} />
                  </button>


                  <button onClick={() => validateLesson(course.id)}>
                    <CheckCircle2 size={16} />
                  </button>


                  <button onClick={() => unlockCourse(course.id)}>
                    {course.status === "Verrouillé" ? <Unlock size={16} /> : <Edit3 size={16} />}
                  </button>


                  <button onClick={() => deleteCourse(course.id)} className="danger">
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>


        <aside className="academySidePanel">
          {selectedCourse ? (
            <>
              <div className="academyPanelTop">
                <h2>{selectedCourse.title}</h2>
                <button onClick={() => setSelectedCourse(null)}>
                  <X size={18} />
                </button>
              </div>


              <p>{selectedCourse.description}</p>


              <div className="academyLessonList">
                {Array.from({ length: selectedCourse.lessons }).map((_, index) => {
                  const lessonProgress = ((index + 1) / selectedCourse.lessons) * 100;
                  const done = selectedCourse.progress >= lessonProgress;


                  return (
                    <div key={index} className="academyLessonItem">
                      {done ? <CheckCircle2 /> : <Video />}
                      <span>Leçon {index + 1}</span>
                      <strong>{done ? "Validée" : "À faire"}</strong>
                    </div>
                  );
                })}
              </div>


              <button
                className="academyPrimaryBtn full"
                onClick={() => validateLesson(selectedCourse.id)}
              >
                <CheckCircle2 size={18} />
                Valider une leçon
              </button>
            </>
          ) : (
            <>
              <h2>Centre pédagogique</h2>
              <p>
                Sélectionne une formation pour voir les leçons, suivre la progression
                et valider les modules.
              </p>


              <div className="academyPanelEmpty">
                <BookOpen />
                <span>Aucune formation sélectionnée</span>
              </div>
            </>
          )}
        </aside>
      </section>
    </main>
  );
}
