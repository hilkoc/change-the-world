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
    menu: "Everyone waits for everyone else",
    eyebrow: "Why nothing moves",
    title: "Everyone is waiting for everyone else.",
    stat: { value: "80–90%", label: "of people underestimate how many others already want change. Supporters outnumber opponents two to one." },
    body: [
      "You vastly underestimate the impact of your own actions, and so take none. You are waiting for a law, a leader, a neighbour, anyone to move first.",
      "So is everyone around you. People copy what they see. Therefore, the most important thing you can ever do in this world is; ",
      "Go first, make positive changes, and loudly say why."
    ],
    note: "Your voice and actions matter, much more than you think."
  },

  {
    id: "contagious",
    kind: "idea",
    accent: "#a5d6a7",
    menu: "What you do spreads",
    eyebrow: "Why it spreads",
    title: "What you do spreads.",
    stat: { value: "3", label: "steps out. Your habits reach your friends, their friends, and their friends' friends." },
    body: [
      "Habits do not stop with you. Follow real friend groups and you can watch them travel.",
      "When one person put on weight, their friends were 57% more likely to follow. Cooperation moves the same way, three steps out.",
      "You are never changing one life. You are changing a crowd you will never meet."
    ],
    note: "Some of that is people picking similar friends, not pure influence. The experiments still show real spread."
  },

  {
    id: "talk",
    kind: "action",
    num: "01",
    accent: "#ff7b00",
    menu: "Say it out loud",
    eyebrow: "Action 01",
    title: "Say it out loud.",
    stat: { value: "59%", label: "think recycling is their biggest move. It is not. Most people are aiming at the wrong thing." },
    body: [
      "People are guessing. One sentence from you fixes that.",
      "Not a lecture. Say the reason once, keep it light, move on.",
      "This is the one that multiplies everything else on the list."
    ],
    todo: [
      "When someone asks, tell them straight. No sermon.",
      "Post what worked, not what you gave up.",
      "Cook for your friends. Nobody argues with good food."
    ],
    pledge: "Tell people why"
  },

  {
    id: "friendly",
    kind: "action",
    num: "02",
    accent: "#ffd166",
    menu: "Be good to people",
    eyebrow: "Action 02",
    title: "Be good to people.",
    stat: { value: "0 kg", label: "of CO2, zero money, zero effort — and it spreads just like everything else here" },
    body: [
      "A better world is not only a cooler one. It is one where people are decent to each other.",
      "Kindness moves through a group. So does loneliness. You pick which one you hand out.",
      "You are also asking people to change how they eat and travel. Nobody takes that from someone rude."
    ],
    todo: [
      "Learn the name of the person who serves you.",
      "Let the car in. Hold the door. Say thanks out loud.",
      "Say the nice thing you were only thinking."
    ],
    pledge: "Be good to people"
  },

  {
    id: "voice",
    kind: "action",
    num: "03",
    accent: "#9d4edd",
    menu: "Vote and speak up",
    eyebrow: "Action 03",
    title: "Vote. Then keep pushing.",
    stat: { value: "1", label: "vote, one email, one meeting — this changes the default for everyone at once" },
    body: [
      "Your choices are set by what exists around you.",
      "You can only take the train if there is a train. You can only order the veggie option if someone cooks one.",
      "Doing it yourself is what makes you worth listening to. Then push for the rest."
    ],
    todo: [
      "Vote. Local ones too — that is where transport and housing live.",
      "Send one short email to your representative. Five minutes.",
      "At work, ask about the canteen, travel policy, pension, energy."
    ],
    pledge: "Vote and speak up"
  },

  {
    id: "big-levers",
    kind: "idea",
    accent: "#ffb4a2",
    menu: "Some things count more",
    eyebrow: "Where to aim",
    title: "Some things count way more.",
    stat: { value: "2.4 t", label: "of CO2 saved a year by living without a car. Recycling everything you own saves 0.2 t." },
    body: [
      "59% of people think recycling is their best move. In rich countries it comes 7th out of 9.",
      "The big ones are flying, driving and what you eat. One return flight across the Atlantic is 1.6 tonnes.",
      "Do the small stuff too. Just do not let it stand in for the big stuff."
    ]
  },

  {
    id: "flying",
    kind: "action",
    num: "04",
    accent: "#577590",
    menu: "Fly less",
    eyebrow: "Action 04",
    title: "Fly way less.",
    stat: { value: "1.6 t", label: "of CO2 for one return long-haul flight — more than a whole year of some people's emissions" },
    body: [
      "Nothing you do in a day cancels a long-haul flight. One boarding pass beats a year of careful shopping.",
      "This one hurts, because flying is how you see people. So spend those flights on purpose.",
      "Fewer trips, longer stays. Better trips anyway."
    ],
    todo: [
      "Under 6 to 8 hours by train? Take the train.",
      "One big trip a year instead of three weekend ones.",
      "Kill the flight that exists for a two-hour meeting."
    ],
    pledge: "Fly less"
  },

  {
    id: "driving",
    kind: "action",
    num: "05",
    accent: "#43aa8b",
    menu: "Drive less",
    eyebrow: "Action 05",
    title: "Get out of the car.",
    stat: { value: "2.4 t", label: "of CO2 saved a year by living without a car" },
    body: [
      "Going car-free is one of the biggest moves you can make. Not everyone can. Everyone can drive less.",
      "Most trips are short, and short trips are when an engine is dirtiest.",
      "Fewer cars means quieter streets, cleaner air, kids who can cross the road."
    ],
    todo: [
      "Under 5 km: bike, walk, bus. Make it the default.",
      "One car per household. Rent or share for the rest.",
      "Next car: electric, and smaller."
    ],
    pledge: "Drive less"
  },

  {
    id: "beef",
    kind: "action",
    num: "06",
    accent: "#ef476f",
    menu: "Drop the beef",
    eyebrow: "Action 06",
    title: "Drop the beef.",
    stat: { value: "60 kg", label: "of CO2 per kg of beef. Peas: about 1 kg." },
    body: [
      "Biggest change on your plate. Nothing else in the shop comes close.",
      "Methane from the cows is 49% of it. Water: 15,400 litres per kg, against 4,300 for chicken.",
      "You do not have to be perfect. People who swapped only their beef cut their food footprint by about 48%."
    ],
    todo: [
      "Swap beef for beans, lentils or chicken this week.",
      "Order the other thing on the menu once. See if you miss it.",
      "Burgers: mushroom, bean, or a decent plant patty."
    ],
    pledge: "No beef"
  },

  {
    id: "meat",
    kind: "action",
    num: "07",
    accent: "#f4845f",
    menu: "Drop the rest",
    eyebrow: "Action 07",
    title: "Then drop the rest.",
    stat: { value: "0.8 t", label: "of CO2 saved a year by eating plants instead of meat" },
    body: [
      "Beef first, because it is the worst. But going fully plant-based is the biggest food change there is.",
      "Meat is roughly ten times worse than beans per kilo. Land is the hidden half: less grazing, more forest left standing.",
      "Flip the default. Plants unless you decide otherwise."
    ],
    todo: [
      "Plants are the default at home. Meat becomes a decision.",
      "Learn three meat-free meals you actually love.",
      "Five days a week, then six, then most."
    ],
    pledge: "Eat plants"
  },

  {
    id: "money",
    kind: "action",
    num: "08",
    accent: "#277da1",
    menu: "Move your money",
    eyebrow: "Action 08",
    title: "Move your money.",
    stat: { value: "£3,000", label: "of the average UK pension is invested in oil, gas and coal" },
    body: [
      "Your pension is not sitting in a vault. It is out buying things, often fossil fuels.",
      "One campaign put a green pension at 21 times the effect of going veggie, quitting flying and switching energy supplier combined.",
      "Take that number with a pinch of salt: the campaign paid for it, and it mixes two ways of counting. The direction is right, and it costs you one afternoon."
    ],
    todo: [
      "Check what your pension fund actually holds.",
      "Switch to the sustainable fund your provider already has.",
      "Move your bank if it finances fossil fuels."
    ],
    pledge: "Green my money"
  },

  {
    id: "food-waste",
    kind: "action",
    num: "09",
    accent: "#90be6d",
    menu: "Eat what you buy",
    eyebrow: "Action 09",
    title: "Eat what you buy.",
    stat: { value: "8%", label: "of all global emissions come from food nobody eats — double the impact of all flying" },
    body: [
      "A third of the world's food is never eaten. Fixing that cuts methane fast.",
      "Rich countries bin up to 35% of their food at home. A family of four in the US throws out about $2,913 a year.",
      "All the land, water and fuel behind that food, spent for nothing."
    ],
    todo: [
      "Plan the week. Shop from a list.",
      "Leftovers at the front of the fridge. Freeze it before it turns.",
      "Look at it, smell it. Best-before is a guess."
    ],
    pledge: "Waste no food"
  },

  {
    id: "home-energy",
    kind: "action",
    num: "10",
    accent: "#f9c74f",
    menu: "Fix your home energy",
    eyebrow: "Action 10",
    title: "Fix your home energy.",
    stat: { value: "1 °C", label: "off the thermostat. Easiest cut in the house, and nobody notices." },
    body: [
      "Getting your electricity from renewables ranks up there with flying and driving. One switch, once, and it keeps working.",
      "Heating is the big number. Insulation is boring and beats almost anything you can buy."
    ],
    todo: [
      "Switch to a genuinely renewable tariff today.",
      "Draft strips, curtains, insulation. Cheapest first.",
      "When the boiler dies, get a heat pump."
    ],
    pledge: "Clean home energy"
  },

  {
    id: "clothes",
    kind: "action",
    num: "11",
    accent: "#bc6c25",
    menu: "Wear your clothes out",
    eyebrow: "Action 11",
    title: "Wear your clothes out.",
    stat: { value: "10%", label: "of global emissions come from fashion — more than flying and shipping combined" },
    body: [
      "Brands make about twice as much clothing as they did in 2000. The industry dumps 92 million tonnes of waste a year.",
      "68% of fibres are plastic. Every wash sheds microplastic into the sea.",
      "Donating is not a get-out. Ghana gets 15 million used items a week and 40% are unsellable."
    ],
    todo: [
      "Before you buy: will I wear this 30 times?",
      "Fix it. A button takes ten minutes.",
      "Wash cold, skip the dryer. Clothes last longer."
    ],
    pledge: "Buy fewer clothes"
  },

  {
    id: "packaging",
    kind: "action",
    num: "12",
    accent: "#06d6a0",
    menu: "Skip the packaging",
    eyebrow: "Action 12",
    title: "Skip the packaging.",
    stat: { value: "7", label: "bits of plastic in one multipack of six small crisp bags" },
    body: [
      "A big bag full of little bags. You pay more, get less, and bin seven wrappers.",
      "Recycling does not fix this. Not buying it does.",
      "Every refusal is a message to the shop. Shelves follow tills."
    ],
    todo: [
      "One big bag. Tip it into a jar at home.",
      "Loose fruit and veg, not wrapped trays.",
      "Bag, bottle, cup. Refill."
    ],
    pledge: "Skip the packaging"
  },

  {
    id: "shower",
    kind: "action",
    num: "13",
    accent: "#4cc9f0",
    menu: "Short showers",
    eyebrow: "Action 13",
    title: "Cut the shower short.",
    stat: { value: "150 L", label: "for a 10-minute shower on a normal 15 L/min head" },
    body: [
      "The water counts. The energy heating it counts more.",
      "Normal heads run 12 to 15 litres a minute. The average shower is 7.8 minutes and about 60 litres.",
      "Four minutes less a day is tens of thousands of litres a year, and a smaller bill."
    ],
    todo: [
      "One song long. Out when it ends.",
      "Low-flow head: 6 to 8 L/min. Same feel, half the water.",
      "Tap off while you soap or shave. Fix the drip."
    ],
    pledge: "Short showers"
  },

  {
    id: "napkins",
    kind: "action",
    num: "14",
    accent: "#c77dff",
    menu: "Ditch the paper",
    eyebrow: "Action 14",
    title: "Ditch the paper.",
    stat: { value: "20 s", label: "is how long a paper napkin lives. A cotton one lasts a thousand meals." },
    body: [
      "A tree grown, cut, pulped, bleached and shipped so you can wipe your mouth for twenty seconds.",
      "A cotton one does that job for years, then becomes a rag. It goes in a wash you were doing anyway.",
      "Same story with kitchen roll, tissues, paper plates and paper cups."
    ],
    todo: [
      "Buy twelve cloth napkins. Give them a drawer.",
      "Old t-shirts and towels become cleaning rags.",
      "Handkerchief, not tissues. Real cup, not paper."
    ],
    pledge: "No throw-aways"
  },

  {
    id: "pledge",
    kind: "pledge",
    accent: "#ffd166",
    menu: "Your pledge",
    eyebrow: "Now the real part",
    title: "So what are you doing?",
    empty: "Nothing picked yet. Swipe back and hit 'I am in' on the ones you will actually do. Two you keep beats fourteen you forget.",
    lede: "You picked these:",
    outro: "Start this week, not next. Then tell one person. That is the whole thing."
  },

  {
    id: "sources",
    kind: "sources",
    accent: "#8ecae6",
    menu: "Sources",
    eyebrow: "Check it yourself",
    title: "Sources",
    lede: "Do not take our word for it. Every number here comes from one of these.",
    items: [
      { label: "The biggest personal choices, ranked (Lund University)", url: "https://www.lunduniversity.lu.se/article/four-lifestyle-choices-most-reduce-your-carbon-footprint" },
      { label: "Climate-friendly choices, ranked (World Resources Institute)", url: "https://www.wri.org/insights/climate-friendly-choices-ranked" },
      { label: "Which behaviour shifts matter most (WRI)", url: "https://www.wri.org/insights/climate-impact-behavior-shifts" },
      { label: "Emissions per kilo of food (Our World in Data)", url: "https://ourworldindata.org/grapher/ghg-per-kg-poore" },
      { label: "What you eat beats eating local (Our World in Data)", url: "https://ourworldindata.org/food-choice-vs-eating-local" },
      { label: "How much water meat takes to produce", url: "https://www.thepoultrysite.com/news/2016/04/how-much-water-does-it-take-to-produce-meat" },
      { label: "Swapping only the beef cut diets by 48%", url: "https://www.ncbi.nlm.nih.gov/pmc/articles/PMC8827079/" },
      { label: "Food waste, and why fixing it works fast (Project Drawdown)", url: "https://drawdown.org/explorer/reduce-food-loss-waste" },
      { label: "The real price of fast fashion (Nature)", url: "https://www.nature.com/articles/s43017-020-0039-9" },
      { label: "How much water a shower uses", url: "https://home-water-works.org/indoor-use/showers" },
      { label: "How behaviour spreads three steps out (Christakis & Fowler)", url: "https://arxiv.org/abs/1109.5235" },
      { label: "What people think helps, versus what does (WEF / Ipsos)", url: "https://www.weforum.org/stories/2021/05/climate-action-change-behaviour-impact-survey/" },
      { label: "Almost everyone underestimates how many already agree (Nature)", url: "https://www.nature.com/articles/s41467-022-32412-y" },
      { label: "The 21x green pension claim (Make My Money Matter)", url: "https://makemymoneymatter.co.uk/21x/" }
    ]
  }
];
