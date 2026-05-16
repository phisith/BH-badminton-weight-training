function ex(name, equipment, sets, cue, target) {
  return { type: "exercise", name, equipment, sets, cue, target };
}

export const SESSIONS = {
  wed: {
    title: "Wednesday — Upper & Core",
    steps: [
      {
        type: "warmup",
        name: "Warm-up",
        duration: 600,
        items: ["Jump rope or shadow footwork, 10 min continuous"],
        cue: "Light and bouncy. Get the heart rate up gradually."
      },
      {
        type: "warmup",
        name: "Pre-activation",
        duration: 180,
        items: [
          "Arm circles forward 30 sec, back 30 sec",
          "Wrist rotations 30 sec",
          "Shoulder rolls 30 sec"
        ],
        cue: "Wake the joints up before loading them."
      },
      { type: "block", name: "Block 1: Smash Power" },
      ex("KB Swing", "5kg KB", 3, "Hinge at hips, drive with glutes. Not a squat.", { reps: 15 }),
      ex("KB Single-arm Overhead Press", "5kg KB", 3, "Keep core tight, avoid leaning sideways.", { reps: 10, eachSide: true }),
      ex("DB Lateral Raise", "2kg DB", 3, "Slight bend in elbow, raise to shoulder height only.", { reps: 12 }),
      ex("KB Single-arm Row", "5kg KB", 3, "Pull elbow back, squeeze shoulder blade.", { reps: 10, eachSide: true }),
      ex("DB Front Raise", "2kg DB", 3, "Controlled tempo up and down, no swinging.", { reps: 12 }),
      { type: "block", name: "Block 2: Core Stability & Rotation" },
      ex("KB Russian Twist", "5kg KB", 3, "Rotate from core, not just arms.", { reps: 20, note: "10 each side" }),
      ex("Plank with Shoulder Tap", "Bodyweight", 3, "Keep hips still, minimize rotation.", { duration: 30 }),
      ex("KB Deadbug Hold", "5kg KB", 3, "Press lower back into floor throughout.", { reps: 10, eachSide: true }),
      ex("Side Plank", "Bodyweight", 3, "Stack feet, or stagger for easier variation.", { duration: 20, eachSide: true }),
      { type: "block", name: "Block 3: Wrist & Forearm Control" },
      ex("DB Wrist Curl", "2kg DB", 3, "Rest forearm on thigh, move wrist only.", { reps: 15 }),
      ex("DB Reverse Wrist Curl", "2kg DB", 3, "Slow and controlled, full range of motion.", { reps: 15 }),
      ex("DB Forearm Pronation/Supination", "2kg DB", 3, "Mimic racket rotation for smash control.", { reps: 12, eachSide: true }),
      ex("DB Finger Extension Hold", "2kg DB", 3, "Spread fingers wide, hold tension.", { duration: 10 }),
      {
        type: "cooldown",
        name: "Cool down",
        duration: 300,
        items: ["Chest stretch", "Tricep stretch", "Wrist flexor / extensor stretch", "Child's pose"],
        cue: "Hold each stretch around 30 to 45 seconds, breathe slow."
      }
    ]
  },
  sat: {
    title: "Saturday — Legs & Hardware",
    steps: [
      {
        type: "warmup",
        name: "Warm-up",
        duration: 600,
        items: ["Jump rope or shadow footwork, 10 min continuous"],
        cue: "Prime the legs. Stay light on the feet."
      },
      { type: "block", name: "Block 1: Explosive & Reactive" },
      ex("Pogo Hops", "Bodyweight", 3, "Stay on balls of feet, minimize ground contact.", { reps: 20 }),
      ex("Lateral Bounds", "Bodyweight", 3, "Push off outside foot, land softly on opposite foot.", { reps: 10, eachSide: true }),
      ex("Jump Squat", "Bodyweight", 3, "Land softly with bent knees, absorb impact.", { reps: 10 }),
      ex("KB Swing", "5kg KB", 3, "Hinge at hips, drive with glutes. Not a squat.", { reps: 15 }),
      { type: "block", name: "Block 2: Strength & Stability" },
      ex("Calf Raises", "2kg DB (double)", 3, "Full range. All the way up and all the way down.", { reps: 15 }),
      ex("KB Romanian Deadlift", "5kg KB", 3, "Slight bend in knee, hinge at hip, feel hamstring stretch.", { reps: 10, eachSide: true }),
      ex("Side Lunge", "Bodyweight", 3, "Keep chest up, push knee out over toes.", { reps: 10, eachSide: true }),
      { type: "block", name: "Block 3: Badminton-Specific" },
      ex("Shadow Badminton", "2kg DB (double)", 3, "Replicate real court movement patterns.", { duration: 45 }),
      ex("Banded Lateral Walk", "Band", 3, "Keep band taut, stay low in athletic stance.", { reps: 10, eachSide: true }),
      {
        type: "cooldown",
        name: "Cool down",
        duration: 300,
        items: ["Quad stretch", "Hamstring stretch", "Hip flexor stretch", "Calf stretch"],
        cue: "Hold each stretch around 30 to 45 seconds, breathe slow."
      }
    ]
  }
};

export function fmtTime(s) {
  const m = Math.floor(s / 60);
  const r = s % 60;
  return `${m}:${String(r).padStart(2, "0")}`;
}

export function extractYouTubeId(s) {
  if (!s) return "";
  const m1 = s.match(/(?:v=|youtu\.be\/|\/embed\/|\/shorts\/)([A-Za-z0-9_-]{11})/);
  if (m1) return m1[1];
  if (/^[A-Za-z0-9_-]{11}$/.test(s)) return s;
  return "";
}
