/* Content for the deck.

   CHAPTERS group the pages. Horizontal swipe moves inside a chapter and on into
   the next one; swipe down jumps a whole chapter.

   Page fields:
     kind    hero | idea | action | pledge | sources
     chapter id from CHAPTERS
     stat    the one number, plus what it means
     body    2-3 short paragraphs
     norm    one line saying the behaviour is already changing
     todo    3 concrete steps, each naming the replacement
     ask     the question put to the reader, answered by the pledge button
     plan    the if-then the reader keeps once they say yes
     proof   the citations behind this page; the sources page is built from these */

const CHAPTERS = [
  { id: "why", label: "Why it matters" },
  { id: "voice", label: "Your voice" },
  { id: "money", label: "Your money" },
  { id: "footprint", label: "Your footprint" },
  { id: "commit", label: "Your move" }
];

const PAGES = [
  {
    id: "start",
    kind: "hero",
    chapter: "why",
    accent: "#ffd166",
    menu: "We change the world!",
    title: "We change the world!",
    lede: "Our actions change the future of our children, for better or for worse. ",
    hint: true
  },

  {
    id: "you-matter",
    kind: "idea",
    chapter: "why",
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
    note: "Your voice and actions matter, much more than you think.",
    proof: [
      { claim: "80–90% underestimate support; 66–80% back the policies, people guess 37–43%. Representative US sample, n = 6,119.", source: "Sparkman, Geiger & Weber 2022, Nature Communications", url: "https://www.nature.com/articles/s41467-022-32412-y" }
    ]
  },

  {
    id: "contagious",
    kind: "idea",
    chapter: "why",
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
    note: "Some of that is people picking similar friends, not pure influence. The experiments still show real spread.",
    proof: [
      { claim: "Three degrees of influence; the 57% figure comes from the Framingham social network data. Critics argue part of the pattern is clustering rather than influence, which is why the randomised cooperation experiments matter.", source: "Christakis & Fowler, social contagion review", url: "https://arxiv.org/abs/1109.5235" }
    ]
  },

  {
    id: "talk",
    kind: "action",
    num: "01",
    chapter: "voice",
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
    ask: "Will you tell one person this week why you are doing this?",
    plan: "When someone asks what I am up to, I tell them the real reason. Once, then I drop it.",
    pledge: "Tell people why",
    proof: [
      { claim: "59% of people named recycling as the best way to cut their footprint; for rich countries it ranks 7th of 9.", source: "World Economic Forum / Ipsos survey", url: "https://www.weforum.org/stories/2021/05/climate-action-change-behaviour-impact-survey/" }
    ]
  },

  {
    id: "friendly",
    kind: "action",
    num: "02",
    chapter: "voice",
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
    ask: "Will you make one stranger's day better today?",
    plan: "Next time someone serves me, I look up, use their name, and mean the thank you.",
    pledge: "Be good to people",
    proof: [
      { claim: "Cooperation spread up to three degrees in randomised public-goods experiments; loneliness clusters and spreads through the same networks.", source: "Christakis & Fowler, social contagion review", url: "https://arxiv.org/abs/1109.5235" }
    ]
  },

  {
    id: "voice",
    kind: "action",
    num: "03",
    chapter: "voice",
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
    ask: "Will you send one email this week?",
    plan: "On Sunday evening, I send one short email to my representative. Then I close the laptop.",
    pledge: "Vote and speak up",
    proof: [
      { claim: "Civic action ranks among the highest-impact things an individual can do, because the surrounding system sets which choices exist.", source: "World Resources Institute, behaviour shifts", url: "https://www.wri.org/insights/climate-impact-behavior-shifts" }
    ]
  },

  {
    id: "spend",
    kind: "idea",
    chapter: "money",
    accent: "#ffb703",
    menu: "Every euro is a vote",
    eyebrow: "The lever nobody uses",
    title: "Every euro you spend is a vote.",
    stat: { value: "57", label: "companies and states are behind 80% of the world's fossil CO2 since the Paris deal. You buy from some of them every week." },
    body: [
      "Companies do not read your opinions. They read their revenue, weekly.",
      "You have been told your footprint is your fault. Your footprint is mostly a menu somebody else wrote.",
      "You still choose from that menu. Every till receipt is a signal, and enough of them move a company faster than any law."
    ],
    proof: [
      { claim: "57 corporate and state producers are linked to 80% of global fossil fuel and cement CO2 from 2016 to 2022; 117 producers account for 88%.", source: "InfluenceMap, Carbon Majors database", url: "https://influencemap.org/pressrelease/Carbon-Majors-57-fossil-fuel-and-cement-producers-linked-to-80-of-global-fossil-CO2-emissions-since-the-Paris-Agreement-27590" }
    ]
  },

  {
    id: "rosa",
    kind: "idea",
    chapter: "money",
    accent: "#e07a5f",
    menu: "One woman said no",
    eyebrow: "It has been done",
    title: "One woman said no. It worked.",
    stat: { value: "381", label: "days without riders. The bus company lost about $3,000 every single day." },
    body: [
      "December 1955. Rosa Parks stays in her seat. Four days later, Montgomery's Black residents stop riding the buses.",
      "Roughly 75% of the riders were Black. Between 30,000 and 40,000 people took part, out of 50,000.",
      "They did not just refuse. They built the replacement: about 300 cars, 40 pickup points, every day for a year. The buses were desegregated in December 1956."
    ],
    note: "Refusing was half of it. Organising the alternative was the other half.",
    proof: [
      { claim: "381 days, 5 December 1955 to 20 December 1956; around 75% of riders were Black; roughly $3,000 lost per day; carpool of about 300 vehicles and 40 pickup stations. The often-quoted total loss is that daily figure multiplied out, not an audited number.", source: "National Museum of African American History & Culture", url: "https://www.searchablemuseum.com/the-montgomery-bus-boycott/" }
    ]
  },

  {
    id: "boycott-rules",
    kind: "idea",
    chapter: "money",
    accent: "#f2a65a",
    menu: "Why most boycotts fail",
    eyebrow: "Be honest about this",
    title: "Most boycotts fail. Here is why some do not.",
    stat: { value: "−24.6%", label: "sales in four weeks. Bud Light, 2023. Its parent lost around $400 million in a single US quarter." },
    body: [
      "Most boycotts do nothing. People post, then buy the thing anyway. One US boycott even boosted sales.",
      "The ones that bite share a shape: an easy substitute, a visible product, and people who keep going after the news moves on.",
      "When Bud Light drinkers walked, Coors Light rose 24.4% and Miller Lite 21%. The money did not vanish. It moved next door, and the habit stuck."
    ],
    note: "Rule: never drop a product without picking its replacement in the same breath.",
    proof: [
      { claim: "Sales fell 17% in the week ending 15 April 2023 and 24.6% over the four weeks ending 3 June 2023; AB InBev US revenue fell 10.5% that quarter, close to $400M. Coors Light +24.4%, Miller Lite +21%.", source: "Harvard Business Review, lessons from the Bud Light boycott", url: "https://hbr.org/2024/03/lessons-from-the-bud-light-boycott-one-year-later" },
      { claim: "Household panel data (NielsenIQ, 40–60k US households) shows regular pre-boycott buyers cut Bud Light volume by 34–37%, with partial switching to other beer.", source: "Janssen, Economics Letters 2026", url: "https://papers.ssrn.com/sol3/papers.cfm?abstract_id=5233331" }
    ]
  },

  {
    id: "the-57",
    kind: "action",
    num: "04",
    chapter: "money",
    accent: "#3d405b",
    menu: "Starve the worst",
    eyebrow: "Action 04",
    title: "57 companies. 80% of the carbon.",
    stat: { value: "80%", label: "of fossil CO2 since the Paris deal traces back to 57 producers" },
    body: [
      "Aramco 4.8%. Gazprom 3.3%. Coal India 3.0%. Chevron 3.0%. Exxon 2.8%. BP 2.2%. Six names, a sixth of the problem.",
      "They signed Paris, then dug faster. Most of them produce more now than before 2016.",
      "You cannot boycott a barrel of oil. You can stop handing them your fuel money and your pension."
    ],
    todo: [
      "Fill up anywhere but the top of that list.",
      "Check whether your pension holds them. Most do.",
      "Electric where you can."
    ],
    ask: "Will you take your money out of the worst of them?",
    plan: "This weekend, I look up which fossil companies my pension and my bank are funding.",
    pledge: "Starve the worst",
    proof: [
      { claim: "57 entities linked to 80% of fossil and cement CO2, 2016–2022. Saudi Aramco 4.8%, Gazprom 3.3%, Coal India 3.0%, Chevron 3.0%, ExxonMobil 2.8%, BP 2.2%. 65% of state-owned and 55% of investor-owned producers raised output after Paris.", source: "InfluenceMap, Carbon Majors database", url: "https://influencemap.org/pressrelease/Carbon-Majors-57-fossil-fuel-and-cement-producers-linked-to-80-of-global-fossil-CO2-emissions-since-the-Paris-Agreement-27590" }
    ]
  },

  {
    id: "they-knew",
    kind: "idea",
    chapter: "money",
    accent: "#5f6f94",
    menu: "They knew",
    eyebrow: "Why you were confused",
    title: "They knew. They said the opposite.",
    stat: { value: "10 of 16", label: "of Exxon's own internal warming projections matched the warming that actually happened" },
    body: [
      "Between 1977 and 2003, Exxon's scientists modelled global warming. Their projections were at least as good as the independent academic models of the time.",
      "In 1999 the CEO called climate projections 'sheer speculation'. In 2013 another called the models 'not competent'.",
      "So when a company tells you the problem is your straw, your shower, your personal footprint, remember who paid for that framing."
    ],
    proof: [
      { claim: "Assessment of 16 internal and published Exxon temperature projections from 1977 to 2003: most accurately forecast the observed warming and were at least as skillful as independent models. Quotes from Lee Raymond (1999) and Rex Tillerson (2013).", source: "Supran, Rahmstorf & Oreskes, Science 2023", url: "https://www.science.org/doi/10.1126/science.abk0063" }
    ]
  },

  {
    id: "plastic",
    kind: "action",
    num: "05",
    chapter: "money",
    accent: "#e63946",
    menu: "Same name, six years",
    eyebrow: "Action 05",
    title: "Same name, six years running.",
    stat: { value: "537,719", label: "pieces of branded plastic counted off beaches and streets. Coca-Cola came first for the sixth year in a row." },
    body: [
      "Volunteers in 41 countries pick up the rubbish and read the labels. The same names come back every year.",
      "2023 top five: Coca-Cola, Nestlé, Unilever, PepsiCo, Mondelēz.",
      "That plastic exists because we keep buying drinks in it. Tap water is free and already in your kitchen."
    ],
    todo: [
      "Carry a bottle. Fill it at home, not at the till.",
      "Glass or tap, never the single-use bottle.",
      "Refills and concentrate over new plastic."
    ],
    ask: "Will you carry a refill bottle every day this week?",
    plan: "Every morning this week, I fill my bottle before I leave the house.",
    pledge: "No single-use bottles",
    proof: [
      { claim: "2023 global brand audit: 8,804 volunteers in 41 countries counted 537,719 pieces of plastic waste. The Coca-Cola Company ranked first for the sixth consecutive year, followed by Nestlé, Unilever, PepsiCo, Mondelēz, Mars, P&G, Danone, Altria and British American Tobacco.", source: "Break Free From Plastic, 2023 brand audit", url: "https://www.breakfreefromplastic.org/2024/02/07/bffp-movement-unveils-2023-global-brand-audit-results/" }
    ]
  },

  {
    id: "upf",
    kind: "action",
    num: "06",
    chapter: "money",
    accent: "#d62828",
    menu: "This is not food",
    eyebrow: "Action 06",
    title: "This is not food.",
    stat: { value: "32", label: "health problems linked to diets high in ultra-processed food, across studies covering nearly 10 million people" },
    body: [
      "Roughly 50% higher risk of dying from heart disease. 48–53% higher risk of anxiety. 21% higher risk of dying from anything.",
      "That is association, not proof of cause. It is also the same answer from nearly ten million people.",
      "The chains sell you speed. Beat them: a pan, an onion, twenty minutes."
    ],
    todo: [
      "Cook one more meal a week than last week.",
      "Learn three fast meals by heart.",
      "Ordering anyway? Independent kitchen, not the chain."
    ],
    ask: "Will you cook one more meal a week than you do now?",
    plan: "On Wednesday evening I cook instead of ordering. The ingredients are in the house by Tuesday.",
    pledge: "Cook it myself",
    proof: [
      { claim: "Umbrella review of 45 pooled analyses, n ≈ 9,888,373, linking ultra-processed food intake to 32 of 45 health parameters: about 50% higher risk of cardiovascular death, 48–53% higher risk of anxiety and common mental disorders, 12% higher type 2 diabetes risk, 21% higher all-cause mortality. The evidence is observational and much of it rates low on GRADE, so this is association, not established cause.", source: "Lane et al., BMJ 2024", url: "https://www.bmj.com/content/384/bmj-2023-077310" }
    ]
  },

  {
    id: "tax",
    kind: "action",
    num: "07",
    chapter: "money",
    accent: "#457b9d",
    menu: "They skip the bill",
    eyebrow: "Action 07",
    title: "They use the roads. They skip the bill.",
    stat: { value: "£643m", label: "of UK sales in one year. Corporation tax paid on it: nothing." },
    body: [
      "Starbucks sold £643 million of coffee in the UK in 2011 and paid no corporation tax on it. Parliament called it an insult to British business.",
      "In 2024 the EU's top court ruled €13.1 billion of Apple's Irish tax breaks unlawful, and made Ireland take the money back.",
      "Schools and hospitals are paid for by everyone who cannot afford that trick."
    ],
    todo: [
      "Coffee at the independent place, not the chain.",
      "Order from the shop, not the marketplace squeezing it.",
      "Ask your employer where its tax residence is."
    ],
    ask: "Will you buy your next coffee somewhere independent?",
    plan: "Tomorrow morning I walk the extra two minutes to the independent place.",
    pledge: "Buy independent",
    proof: [
      { claim: "Starbucks reported £643m of UK sales in 2011 with no corporation tax paid, and had paid UK corporation tax once in the previous 15 years; the Public Accounts Committee criticised this in 2012. Note that the separate EU state-aid cases against Starbucks, Amazon and Fiat were annulled and closed in 2024 — only Apple's was upheld.", source: "UK Public Accounts Committee coverage", url: "https://www.nbcnews.com/business/business-news/google-amazon-starbucks-face-tax-questions-uk-flna1c7009957" },
      { claim: "On 10 September 2024 the Court of Justice of the European Union delivered a final judgment that Ireland granted Apple unlawful state aid, ordering recovery of €13.1 billion.", source: "Commission v Ireland, C-465/20 P", url: "https://www.cliffordchance.com/briefings/2024/09/apple-loses-the-13-billion-tax-ruling-state-aid-case.html" }
    ]
  },

  {
    id: "money",
    kind: "action",
    num: "08",
    chapter: "money",
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
    ask: "Will you check your pension this month?",
    plan: "On Saturday morning, with coffee, I log in and read what my pension fund holds.",
    pledge: "Green my money",
    proof: [
      { claim: "Campaign analysis with Aviva and Route2 estimating a green pension at 21 times the carbon saving of going vegetarian, giving up flying and switching energy supplier combined, and about £3,000 of the average UK pension invested in fossil fuel companies. Campaign-commissioned, and it compares investment emissions with personal consumption emissions.", source: "Make My Money Matter", url: "https://makemymoneymatter.co.uk/21x/" }
    ]
  },

  {
    id: "big-levers",
    kind: "idea",
    chapter: "footprint",
    accent: "#ffb4a2",
    menu: "Some things count more",
    eyebrow: "Where to aim",
    title: "Some things count way more.",
    stat: { value: "2.4 t", label: "of CO2 saved a year by living without a car. Recycling everything you own saves 0.2 t." },
    body: [
      "59% of people think recycling is their best move. In rich countries it comes 7th out of 9.",
      "The big ones are flying, driving and what you eat. One return flight across the Atlantic is 1.6 tonnes.",
      "Do the small stuff too. Just do not let it stand in for the big stuff."
    ],
    proof: [
      { claim: "Living car-free saves about 2.4 tonnes CO2e a year, one avoided transatlantic return flight 1.6 tonnes, a plant-based diet about 0.8 tonnes; comprehensive recycling about 0.2 tonnes.", source: "Wynes & Nicholas 2017, via Lund University", url: "https://www.lunduniversity.lu.se/article/four-lifestyle-choices-most-reduce-your-carbon-footprint" },
      { claim: "Ranking of climate-friendly choices for high-income countries, where recycling places 7th of 9.", source: "World Resources Institute", url: "https://www.wri.org/insights/climate-friendly-choices-ranked" }
    ]
  },

  {
    id: "flying",
    kind: "action",
    num: "09",
    chapter: "footprint",
    accent: "#577590",
    menu: "Fly less",
    eyebrow: "Action 09",
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
    ask: "Will you take the train for your next short trip?",
    plan: "Next trip under eight hours by rail, I check the train price before I open the flight site.",
    pledge: "Fly less",
    proof: [
      { claim: "One avoided transatlantic return flight saves about 1.6 tonnes CO2e.", source: "Wynes & Nicholas 2017, via Lund University", url: "https://www.lunduniversity.lu.se/article/four-lifestyle-choices-most-reduce-your-carbon-footprint" }
    ]
  },

  {
    id: "driving",
    kind: "action",
    num: "10",
    chapter: "footprint",
    accent: "#43aa8b",
    menu: "Drive less",
    eyebrow: "Action 10",
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
    ask: "Will you leave the car home for trips under 5 km?",
    plan: "When the trip is under 5 km, I take the bike. The keys stay on the hook.",
    pledge: "Drive less",
    proof: [
      { claim: "Living car-free saves about 2.4 tonnes CO2e a year, one of the largest individual actions available in a rich country.", source: "Wynes & Nicholas 2017, via Lund University", url: "https://www.lunduniversity.lu.se/article/four-lifestyle-choices-most-reduce-your-carbon-footprint" }
    ]
  },

  {
    id: "beef",
    kind: "action",
    num: "11",
    chapter: "footprint",
    accent: "#ef476f",
    menu: "Drop the beef",
    eyebrow: "Action 11",
    title: "Drop the beef.",
    stat: { value: "60 kg", label: "of CO2 per kg of beef. Peas: about 1 kg." },
    body: [
      "Biggest change on your plate. Nothing else in the shop comes close.",
      "Methane from the cows is 49% of it. Water: 15,400 litres per kg, against 4,300 for chicken.",
      "You do not have to be perfect. Swapping only beef cut people's food footprint by about 48%."
    ],
    todo: [
      "Swap beef for beans, lentils or chicken this week.",
      "Order the other thing on the menu once. See if you miss it.",
      "Burgers: mushroom, bean, or a decent plant patty."
    ],
    ask: "Will you skip beef for one week?",
    plan: "When I order lunch this week, I take the one without beef. Starting with the next one.",
    pledge: "No beef",
    proof: [
      { claim: "Beef produces about 60 kg CO2e per kg at the farm stage against roughly 1 kg for peas; methane accounts for 49% of beef's emissions.", source: "Poore & Nemecek 2018, via Our World in Data", url: "https://ourworldindata.org/grapher/ghg-per-kg-poore" },
      { claim: "Water footprint of beef about 15,400 litres per kg against 4,300 for chicken.", source: "Mekonnen & Hoekstra figures", url: "https://www.thepoultrysite.com/news/2016/04/how-much-water-does-it-take-to-produce-meat" },
      { claim: "US study: participants who substituted only their beef items cut their diet's carbon footprint by roughly 48%.", source: "Single-item substitutions in US diets", url: "https://www.ncbi.nlm.nih.gov/pmc/articles/PMC8827079/" }
    ]
  },

  {
    id: "meat",
    kind: "action",
    num: "12",
    chapter: "footprint",
    accent: "#f4845f",
    menu: "Drop the rest",
    eyebrow: "Action 12",
    title: "Then drop the rest.",
    stat: { value: "0.8 t", label: "of CO2 saved a year by eating plants instead of meat" },
    body: [
      "Beef first, because it is the worst. Going fully plant-based is the biggest food change there is.",
      "Meat is roughly ten times worse than beans per kilo. Less grazing also means more forest left standing.",
      "Flip the default. Plants unless you decide otherwise."
    ],
    norm: "30% of Americans have cut back on meat in the past five years. This is already moving.",
    todo: [
      "Plants are the default at home. Meat becomes a decision.",
      "Learn three meat-free meals you actually love.",
      "Five days a week, then six, then most."
    ],
    ask: "Will you make plants the default at home?",
    plan: "When I plan the week's meals, plants go on the list first and meat has to earn its place.",
    pledge: "Eat plants",
    proof: [
      { claim: "A plant-based diet saves roughly 0.8 tonnes CO2e a year.", source: "Wynes & Nicholas 2017, via Lund University", url: "https://www.lunduniversity.lu.se/article/four-lifestyle-choices-most-reduce-your-carbon-footprint" },
      { claim: "Telling people a behaviour is changing doubled meatless orders in a café field experiment, 34% against 17%, using the cue that 30% of Americans had started limiting meat over five years. A UK replication failed to find the effect, and measured consumption changes are smaller, around 6.8%.", source: "Sparkman & Walton 2017, Psychological Science", url: "https://journals.sagepub.com/doi/abs/10.1177/0956797617719950" }
    ]
  },

  {
    id: "food-waste",
    kind: "action",
    num: "13",
    chapter: "footprint",
    accent: "#90be6d",
    menu: "Eat what you buy",
    eyebrow: "Action 13",
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
    ask: "Will you shop from a list this week?",
    plan: "Before I go shopping, I write the list. In the shop I buy what is on it.",
    pledge: "Waste no food",
    proof: [
      { claim: "About a third of food produced is wasted, generating roughly 8% of global greenhouse gases, more than double the emissions of aviation. Up to 35% of food in high-income economies is thrown out by consumers; a four-person US household wastes about $2,913 of food a year.", source: "Project Drawdown", url: "https://drawdown.org/explorer/reduce-food-loss-waste" }
    ]
  },

  {
    id: "home-energy",
    kind: "action",
    num: "14",
    chapter: "footprint",
    accent: "#f9c74f",
    menu: "Fix your home energy",
    eyebrow: "Action 14",
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
    ask: "Will you check tonight whether your electricity is actually renewable?",
    plan: "Tonight I open my energy account and read what I am actually buying.",
    pledge: "Clean home energy",
    proof: [
      { claim: "Renewable home energy ranks alongside driving less and flying less among the highest-impact household shifts.", source: "World Resources Institute", url: "https://www.wri.org/insights/climate-friendly-choices-ranked" }
    ]
  },

  {
    id: "clothes",
    kind: "action",
    num: "15",
    chapter: "footprint",
    accent: "#bc6c25",
    menu: "Wear your clothes out",
    eyebrow: "Action 15",
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
    ask: "Will you skip your next impulse clothes buy?",
    plan: "Before buying clothes, I ask whether I will wear it 30 times. If not, I put it back.",
    pledge: "Buy fewer clothes",
    proof: [
      { claim: "Fashion accounts for about 10% of global carbon emissions, more than international flights and shipping combined, with over 92 million tonnes of waste a year; synthetics are 68% of fibres and a leading source of ocean microplastics; Ghana receives about 15 million second-hand items weekly, roughly 40% unsellable.", source: "Nature Reviews Earth & Environment", url: "https://www.nature.com/articles/s43017-020-0039-9" }
    ]
  },

  {
    id: "packaging",
    kind: "action",
    num: "16",
    chapter: "footprint",
    accent: "#06d6a0",
    menu: "Skip the packaging",
    eyebrow: "Action 16",
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
    ask: "Will you leave the multipack on the shelf this week?",
    plan: "In the shop this week, I take the one big bag instead of the six little ones.",
    pledge: "Skip the packaging",
    proof: [
      { claim: "Recycling as much as possible saves about 0.2 tonnes CO2e a year and ranks near the bottom of individual actions, which is why refusing packaging beats sorting it.", source: "Wynes & Nicholas 2017, via Lund University", url: "https://www.lunduniversity.lu.se/article/four-lifestyle-choices-most-reduce-your-carbon-footprint" }
    ]
  },

  {
    id: "shower",
    kind: "action",
    num: "17",
    chapter: "footprint",
    accent: "#4cc9f0",
    menu: "Short showers",
    eyebrow: "Action 17",
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
    ask: "Will you make tomorrow's shower one song long?",
    plan: "Tomorrow I start one song as the water starts, and I am out when it ends.",
    pledge: "Short showers",
    proof: [
      { claim: "The average US shower runs 7.8 minutes at about 7.9 litres a minute, roughly 60 litres; typical UK heads flow 12 to 15 litres a minute, so a 10-minute shower can reach 150 litres.", source: "Home Water Works", url: "https://home-water-works.org/indoor-use/showers" }
    ]
  },

  {
    id: "napkins",
    kind: "action",
    num: "18",
    chapter: "footprint",
    accent: "#c77dff",
    menu: "Ditch the paper",
    eyebrow: "Action 18",
    title: "Ditch the paper.",
    stat: { value: "20 s", label: "is how long a paper napkin lives. A cotton one lasts a thousand meals." },
    body: [
      "A tree grown, cut, pulped, bleached and shipped so you can wipe your mouth for twenty seconds.",
      "A cotton one lasts years, then becomes a rag. It rides in a wash you were doing anyway.",
      "Same for kitchen roll, tissues, paper plates and cups."
    ],
    todo: [
      "Buy twelve cloth napkins. Give them a drawer.",
      "Old t-shirts and towels become cleaning rags.",
      "Handkerchief, not tissues. Real cup, not paper."
    ],
    ask: "Will you buy cloth napkins this week?",
    plan: "This weekend I buy twelve cloth napkins and give them a drawer in the kitchen.",
    pledge: "No throw-aways"
  },

  {
    id: "pledge",
    kind: "pledge",
    chapter: "commit",
    accent: "#ffd166",
    menu: "Your pledge",
    eyebrow: "Now the real part",
    title: "So what are you doing?",
    empty: "Nothing picked yet. Swipe back and answer one of the questions with 'Yes, I am in'. Two you keep beats eighteen you forget.",
    lede: "You said yes to these:",
    outro: "Say the start day out loud to someone today. A plan with a time and a witness is the one that survives."
  },

  {
    id: "sources",
    kind: "sources",
    chapter: "commit",
    accent: "#8ecae6",
    menu: "Sources",
    eyebrow: "Check it yourself",
    title: "Sources",
    lede: "Do not take our word for it. Every number in this deck comes from one of these."
  }
];
