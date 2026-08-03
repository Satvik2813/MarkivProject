import { useState } from "react";
import { Link } from "react-router-dom";
import { Arrow } from "../components/icons";

const recipes = [
  { id: 1, emoji: "🥞", title: "Sprouted Ragi Dosa", time: "20 min", level: "Easy", tag: "Breakfast",
    desc: "Crispy, iron-rich dosas made from sprouted ragi superpowder.",
    steps: ["Mix 1 cup ragi powder with ½ cup rice flour and water to a batter.", "Add salt, chopped onion, green chilli and coriander.", "Rest 15 min, then pour on a hot tawa and drizzle oil.", "Cook till golden and crisp. Serve with chutney."] },
  { id: 2, emoji: "🥛", title: "Ragi Malt Health Drink", time: "10 min", level: "Easy", tag: "Drink",
    desc: "A comforting calcium-packed malt for kids and elders.",
    steps: ["Whisk 2 tbsp ragi powder in ½ cup cold water (no lumps).", "Boil with 1 cup milk, stirring continuously for 5 min.", "Add jaggery/honey and a pinch of cardamom.", "Serve warm or chilled."] },
  { id: 3, emoji: "🫓", title: "Soft Jowar Roti", time: "25 min", level: "Medium", tag: "Lunch",
    desc: "Gluten-free sorghum flatbreads that stay soft.",
    steps: ["Add hot water gradually to 2 cups jowar flour with a pinch of salt.", "Knead into a smooth, warm dough.", "Roll gently with wet hands or between sheets.", "Cook on a hot tawa, puff over flame, brush with ghee."] },
  { id: 4, emoji: "🍲", title: "Multi-Millet Pongal", time: "30 min", level: "Medium", tag: "Lunch",
    desc: "A wholesome one-pot comfort meal.",
    steps: ["Dry roast ½ cup millet mix and ¼ cup moong dal.", "Pressure cook with 3 cups water till soft.", "Temper ghee, cumin, pepper, ginger, curry leaves and cashews.", "Mix in and serve hot."] },
  { id: 5, emoji: "🥣", title: "Baby Millet Porridge", time: "12 min", level: "Easy", tag: "Baby Food",
    desc: "Gentle first food for babies 6 months+.",
    steps: ["Mix 2 tbsp porridge mix in ½ cup water, no lumps.", "Cook on low, stirring, for 6–8 min.", "Adjust consistency with warm milk or water.", "Cool to lukewarm before feeding."] },
  { id: 6, emoji: "🧁", title: "Ragi Banana Muffins", time: "35 min", level: "Medium", tag: "Snack",
    desc: "Guilt-free baked treats for the whole family.",
    steps: ["Mash 2 bananas; mix with 1 cup ragi powder, ½ cup oats, baking powder.", "Add jaggery, oil, milk and vanilla; fold gently.", "Pour into muffin cups.", "Bake at 180°C for 20–22 min."] },
];

export default function Recipes() {
  const [open, setOpen] = useState(null);

  return (
    <>
      <section className="page-hero">
        <div className="container">
          <p className="eyebrow">Recipes</p>
          <h1 className="section-title" style={{ fontSize: 46 }}>Cook with fresh millets</h1>
          <p className="page-hero-sub">Simple, wholesome recipes to make the most of your Shuddha Millets.</p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="recipe-grid">
            {recipes.map((r) => (
              <div className="recipe-card" key={r.id}>
                <div className="recipe-emoji">{r.emoji}</div>
                <div className="recipe-body">
                  <span className="pill">{r.tag}</span>
                  <h3>{r.title}</h3>
                  <p>{r.desc}</p>
                  <div className="recipe-meta"><span>⏱ {r.time}</span><span>📊 {r.level}</span></div>
                  <button className="btn btn-outline btn-block" onClick={() => setOpen(open === r.id ? null : r.id)}>
                    {open === r.id ? "Hide Recipe" : "View Recipe"}
                  </button>
                  {open === r.id && (
                    <ol className="recipe-steps">
                      {r.steps.map((s, i) => <li key={i}>{s}</li>)}
                    </ol>
                  )}
                </div>
              </div>
            ))}
          </div>
          <div style={{ textAlign: "center", marginTop: 44 }}>
            <Link to="/shop" className="btn btn-gold">Get the Ingredients <Arrow /></Link>
          </div>
        </div>
      </section>
    </>
  );
}
