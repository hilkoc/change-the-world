/* Content for the deck. One object per page.
   kind: hero | idea | action | pledge | sources
   Numbers here are sourced; see the final page for references. */

const PAGES = [
  {
    id: "start",
    kind: "hero",
    accent: "#ffd166",
    menu: "We change the world!",
    title: "We change the world!",
    lede: "Our actions change the future of our children, for better or for worse. ",
    hint: true
  },

  {
    id: "you-matter",
    kind: "idea",
    accent: "#8ecae6",
    menu: "Small changes add up",
    eyebrow: "Why bother",
    title: "Small changes add up.",
    stat: { value: "25%", label: "of a household's carbon footprint can be cut by everyday household choices alone" },
    body: [
      "One person feels like a rounding error. That feeling is the main reason nothing changes.",
      "But your footprint is not a mystery. It is a list of repeated decisions: what you eat, how you travel, what you buy, what you throw away.",
      "Change the repeats and the total moves."
    ]
  },

  {
    id: "contagious",
    kind: "idea",
    accent: "#a5d6a7",
    menu: "Your behaviour is contagious",
    eyebrow: "Why it multiplies",
    title: "Your behaviour is contagious.",
    stat: { value: "3", label: "degrees of separation — your choices reach friends of friends of friends" },
    body: [
      "Christakis and Fowler tracked habits through real social networks. They do not stop at the people you know.",
      "When someone became obese, their friends were 57% more likely to follow. In randomised experiments, cooperation spread three degrees out.",
      "You are never changing one life. You are changing a small crowd who will never know why."
    ],
    note: "Critics say part of this is clustering rather than pure influence. The experiments still show real spread."
  },

  {
    id: "big-levers",
    kind: "idea",
    accent: "#ffb4a2",
    menu: "Pull the big levers",
    eyebrow: "Where to aim",
    title: "Pull the big levers first.",
    stat: { value: "2.4 t", label: "CO2e saved per year by living car-free — against 0.2 t for recycling as much as you can" },
    body: [
      "59% of people surveyed thought recycling was their best climate move. For richer countries it ranks 7th out of 9.",
      "The heavy hitters are diet, driving and flying. One transatlantic return flight is 1.6 tonnes.",
      "Do the small things too. Just do not let them stand in for the big ones."
    ]
  },

  {
    id: "beef",
    kind: "action",
    num: "01",
    accent: "#ef476f",
    menu: "Stop eating beef",
    eyebrow: "Action 01",
    title: "Stop eating beef.",
    stat: { value: "60 kg", label: "CO2e per kg of beef — peas are about 1 kg" },
    body: [
      "The biggest single change on most plates. Nothing else in the supermarket is close.",
      "Methane is 49% of beef's emissions. Water: 15,400 litres per kg, against 4,300 for chicken.",
      "You do not have to be perfect. People who swapped only their beef cut their diet's footprint by roughly 48%."
    ],
    todo: [
      "Swap beef for beans, lentils or chicken this week.",
      "Order the other thing on the menu. Once. See if you miss it.",
      "Burgers: mushroom, bean, or a decent plant patty."
    ],
    pledge: "No beef"
  },

  {
    id: "packaging",
    kind: "action",
    num: "02",
    accent: "#06d6a0",
    menu: "Refuse over-packaging",
    eyebrow: "Action 02",
    title: "Refuse over-packaged food.",
    stat: { value: "7", label: "pieces of plastic in one multipack of six small crisp bags" },
    body: [
      "A big bag holding six little bags is convenience sold as packaging. You pay more, get less food, bin seven wrappers.",
      "Recycling will not save you here. Not buying it beats binning it well.",
      "Every refusal is a message to a shop. Shelves follow tills."
    ],
    todo: [
      "Buy the one big bag. Portion it into a jar.",
      "Loose fruit and veg, never wrapped trays.",
      "Carry a bag, a bottle, a cup. Refill."
    ],
    pledge: "No over-packaged food"
  },

  {
    id: "friendly",
    kind: "action",
    num: "03",
    accent: "#ffd166",
    menu: "Be friendly",
    eyebrow: "Action 03",
    title: "Be friendly to people.",
    stat: { value: "0 kg", label: "CO2, 0 money, 0 effort — and it spreads three degrees like everything else" },
    body: [
      "A better world is not only a cooler one. It is one where people are decent to each other.",
      "Kindness travels through networks the way habits do. So does loneliness: it clusters and it spreads.",
      "You are also asking people to change how they eat and travel. Nobody takes that from someone unpleasant."
    ],
    todo: [
      "Learn the name of someone who serves you.",
      "Let the car in. Hold the door. Say the thank you out loud.",
      "Say the good thing you were only thinking."
    ],
    pledge: "Be friendly, on purpose"
  },

  {
    id: "meat",
    kind: "action",
    num: "04",
    accent: "#f4845f",
    menu: "Stop eating meat",
    eyebrow: "Action 04",
    title: "Then stop eating meat.",
    stat: { value: "0.8 t", label: "CO2e saved per year by moving to a plant-based diet" },
    body: [
      "Beef first, because it is the outlier. But the IPCC review is blunt: a plant-based diet is the most effective dietary change there is.",
      "Meat sits roughly ten times above pulses per kilo, and land is the hidden half — less grazing means forest that never falls.",
      "Flip the default. Vegetarian unless you decide otherwise, not meat unless you remember not to."
    ],
    todo: [
      "Make plants the default at home. Meat becomes a decision.",
      "Learn three meals you love that have no meat in them.",
      "Cut the days down: five, then six, then most."
    ],
    pledge: "Eat plant-based"
  },

  {
    id: "shower",
    kind: "action",
    num: "05",
    accent: "#4cc9f0",
    menu: "Shorter showers",
    eyebrow: "Action 05",
    title: "Take shorter showers.",
    stat: { value: "150 L", label: "for one 10-minute shower at a typical 15 L/min shower head" },
    body: [
      "The water matters. The energy to heat it matters more.",
      "Typical heads run 12 to 15 litres a minute. The average US shower is 7.8 minutes and about 60 litres.",
      "Four minutes off, daily, is tens of thousands of litres a year. This one pays you back."
    ],
    todo: [
      "Play one song. Be out when it ends.",
      "Fit a low-flow head: 6 to 8 L/min, same feel, half the water.",
      "Tap off while you soap, shave or brush. Fix the dripping one."
    ],
    pledge: "Short showers"
  },

  {
    id: "napkins",
    kind: "action",
    num: "06",
    accent: "#c77dff",
    menu: "Cotton, not throw-away",
    eyebrow: "Action 06",
    title: "Use cotton napkins.",
    stat: { value: "20 s", label: "the working life of a paper napkin — a cotton one lasts a thousand meals" },
    body: [
      "A tree is grown, felled, pulped, bleached and shipped so you can wipe your mouth for twenty seconds.",
      "A cotton one does that job for years, then retires as a rag. It rides along in a wash you were doing anyway.",
      "Same logic wherever disposables hide: kitchen roll, tissues, plates, cups."
    ],
    todo: [
      "Buy twelve cloth napkins. Give them a drawer.",
      "Old towels and t-shirts become kitchen rags.",
      "Handkerchief, not tissues. Real cup, not paper."
    ],
    pledge: "Cotton, not throw-away"
  },

  {
    id: "food-waste",
    kind: "action",
    num: "07",
    accent: "#90be6d",
    menu: "Waste no food",
    eyebrow: "Action 07",
    title: "Waste no food.",
    stat: { value: "8%", label: "of global greenhouse gases come from wasted food — more than double all aviation" },
    body: [
      "A third of the world's food is never eaten. Project Drawdown calls fixing that an emergency brake: less waste cuts methane fast.",
      "Rich countries bin up to 35% of their food at home. A four-person US household throws out about $2,913 a year.",
      "Every field, tanker and animal behind that food is spent for nothing."
    ],
    todo: [
      "Plan the week. Shop from a list.",
      "Leftovers first, at eye level. Freeze it before it turns.",
      "Smell it and look at it. Best-before is a guess, not a verdict."
    ],
    pledge: "Waste no food"
  },

  {
    id: "flying",
    kind: "action",
    num: "08",
    accent: "#577590",
    menu: "Fly less",
    eyebrow: "Action 08",
    title: "Fly much less.",
    stat: { value: "1.6 t", label: "CO2e for one return transatlantic flight — more than a year of some people's total emissions" },
    body: [
      "Nothing you do in a day undoes a long-haul flight. One boarding pass can outweigh a year of careful shopping.",
      "This one stings, because flying is how we see people. So spend your flights deliberately.",
      "Fewer, longer, better trips beat many short hops."
    ],
    todo: [
      "Under about 6 to 8 hours by train? Take the train.",
      "One long trip a year instead of three short ones. Stay longer.",
      "Say no to the flight that exists for a two-hour meeting."
    ],
    pledge: "Fly less"
  },

  {
    id: "driving",
    kind: "action",
    num: "09",
    accent: "#43aa8b",
    menu: "Drive less",
    eyebrow: "Action 09",
    title: "Get out of the car.",
    stat: { value: "2.4 t", label: "CO2e saved per year by living without a car" },
    body: [
      "Car-free is one of the largest moves an individual in a rich country can make. Not everyone can. Almost everyone can drive less.",
      "Most car trips are short, and short trips are where an engine is dirtiest.",
      "Fewer cars also means quieter streets, cleaner air, and children who can cross them."
    ],
    todo: [
      "Under 5 km: bike, walk or bus. Reflex, not exception.",
      "One car per household. Rent or share for the rare trip.",
      "Next car: electric, and smaller than the last one."
    ],
    pledge: "Drive less"
  },

  {
    id: "clothes",
    kind: "action",
    num: "10",
    accent: "#bc6c25",
    menu: "Wear clothes longer",
    eyebrow: "Action 10",
    title: "Buy fewer clothes. Wear them longer.",
    stat: { value: "10%", label: "of global carbon emissions come from fashion — more than all flights and shipping combined" },
    body: [
      "Brands make about twice the clothing they did before 2000. The industry throws off 92 million tonnes of waste a year.",
      "68% of fibres are synthetic, and washing them sheds microplastic into the ocean.",
      "Donating is no escape hatch: Ghana takes 15 million used items a week, 40% unsellable."
    ],
    todo: [
      "Before buying: will I wear this 30 times?",
      "Repair it. A button is ten minutes.",
      "Wash cold, skip the dryer. Clothes last longer too."
    ],
    pledge: "Buy fewer clothes"
  },

  {
    id: "home-energy",
    kind: "action",
    num: "11",
    accent: "#f9c74f",
    menu: "Clean up your home energy",
    eyebrow: "Action 11",
    title: "Clean up your home energy.",
    stat: { value: "1 °C", label: "off the thermostat — the easiest cut in the house, and nobody notices" },
    body: [
      "The World Resources Institute puts home renewable energy alongside driving and flying. One switch, once, and it keeps paying.",
      "Heating is the big number in most homes. Insulation is unglamorous and beats almost anything you can buy."
    ],
    todo: [
      "Switch to a genuinely renewable electricity tariff today.",
      "Draft strips, curtains, loft insulation. Cheapest wins first.",
      "When the boiler or the car dies, replace it with the electric one."
    ],
    pledge: "Clean home energy"
  },

  {
    id: "money",
    kind: "action",
    num: "12",
    accent: "#277da1",
    menu: "Move your money",
    eyebrow: "Action 12",
    title: "Move your money.",
    stat: { value: "£3,000", label: "of the average UK pension sits in fossil fuel companies" },
    body: [
      "Your savings are not sitting still. They are buying things, often oil, gas and coal.",
      "Make My Money Matter put a green pension at 21 times the effect of going vegetarian, giving up flying and switching energy supplier combined.",
      "Treat that number with care: campaign-commissioned, and it mixes two accounting methods. The direction holds."
    ],
    todo: [
      "Look up what your pension fund holds.",
      "Switch to your provider's sustainable fund.",
      "Move your bank away from fossil finance."
    ],
    pledge: "Green my money"
  },

  {
    id: "voice",
    kind: "action",
    num: "13",
    accent: "#9d4edd",
    menu: "Vote and speak up",
    eyebrow: "Action 13",
    title: "Vote. Then keep pushing.",
    stat: { value: "1", label: "vote, one email, one meeting — these change everyone's default at once" },
    body: [
      "WRI is direct: civic action ranks among the highest-impact things an individual does, because the world sets your options.",
      "You take the train only if the train exists. The canteen has to cook the vegetarian option.",
      "Personal and political change are not rivals. The first makes the second credible."
    ],
    todo: [
      "Vote. Local elections too — that is where transport lives.",
      "Send one short, real email to a representative.",
      "Ask at work: menu, travel policy, pension, energy."
    ],
    pledge: "Vote and speak up"
  },

  {
    id: "talk",
    kind: "action",
    num: "14",
    accent: "#ff7b00",
    menu: "Tell people why",
    eyebrow: "Action 14",
    title: "Tell people why.",
    stat: { value: "59%", label: "believe recycling is their biggest lever. It is not. Most people are aiming at the wrong thing" },
    body: [
      "The gap between what people think helps and what actually helps is enormous. Closing it costs one sentence.",
      "No lecture needed. Silent virtue changes nobody: say the reason once, lightly, and move on.",
      "This is the action that multiplies all the others."
    ],
    todo: [
      "Say why when asked. Once, cheerfully, no sermon.",
      "Share what worked, not what you gave up.",
      "Cook for people. Nobody is argued out of beef; they are fed out of it."
    ],
    pledge: "Tell people why"
  },

  {
    id: "pledge",
    kind: "pledge",
    accent: "#ffd166",
    menu: "Your pledge",
    eyebrow: "Now the part that counts",
    title: "What are you actually doing?",
    empty: "Nothing picked yet. Swipe back and tap 'I am in' on the ones you will really do. Two you keep beats fourteen you forget.",
    lede: "You picked these:",
    outro: "Start this week, not next. Then tell one person. That is the whole method."
  },

  {
    id: "sources",
    kind: "sources",
    accent: "#8ecae6",
    menu: "Sources",
    eyebrow: "Check the numbers",
    title: "Sources",
    lede: "Do not take any of this on trust. Every figure here comes from one of these.",
    items: [
      { label: "Wynes & Nicholas 2017 — the highest-impact individual actions", url: "https://www.lunduniversity.lu.se/article/four-lifestyle-choices-most-reduce-your-carbon-footprint" },
      { label: "World Resources Institute — climate-friendly choices, ranked", url: "https://www.wri.org/insights/climate-friendly-choices-ranked" },
      { label: "WRI — the most impactful behaviour shifts", url: "https://www.wri.org/insights/climate-impact-behavior-shifts" },
      { label: "Poore & Nemecek 2018 — emissions per kg of food (Our World in Data)", url: "https://ourworldindata.org/grapher/ghg-per-kg-poore" },
      { label: "Our World in Data — food choice vs eating local", url: "https://ourworldindata.org/food-choice-vs-eating-local" },
      { label: "Mekonnen & Hoekstra — water footprint of meat", url: "https://www.thepoultrysite.com/news/2016/04/how-much-water-does-it-take-to-produce-meat" },
      { label: "Single-item substitutions in US diets (PMC)", url: "https://www.ncbi.nlm.nih.gov/pmc/articles/PMC8827079/" },
      { label: "Project Drawdown — reduce food loss and waste", url: "https://drawdown.org/explorer/reduce-food-loss-waste" },
      { label: "Nature Reviews Earth & Environment — the environmental price of fast fashion", url: "https://www.nature.com/articles/s43017-020-0039-9" },
      { label: "Home Water Works — shower water use", url: "https://home-water-works.org/indoor-use/showers" },
      { label: "Christakis & Fowler — social contagion, three degrees of influence", url: "https://arxiv.org/abs/1109.5235" },
      { label: "World Economic Forum / Ipsos — what people think helps vs what does", url: "https://www.weforum.org/stories/2021/05/climate-action-change-behaviour-impact-survey/" },
      { label: "Make My Money Matter — climate action report (the 21x claim)", url: "https://makemymoneymatter.co.uk/21x/" }
    ]
  }
];
