/* Content for the deck.

   CHAPTERS group the pages. Horizontal swipe moves inside a chapter and on into
   the next one; swipe down jumps a whole chapter. Pages of one chapter must stay
   next to each other in PAGES: the rail and the chapter jump assume it.

   Page fields:
     kind      feedback | hero | idea | action | pledge | sources
     chapter   id from CHAPTERS
     stat      the one number, plus what it means
     body      2-3 short paragraphs
     norm      one line saying the behaviour is already changing
     note      the caveat, where the evidence has one
     todo      3 concrete steps, each naming the replacement
     todoTitle heading above those steps; "Do this" when left out
     ask       the question put to the reader, answered by the pledge button
     plan      the if-then the reader keeps once they say yes
     proof     the citations behind this page; the sources page is built from these

   House rules for writing a page:
     - Only actions that matter because many people do them. A habit that helps
       one person and nobody else does not earn a card.
     - Never name a thing to drop without naming its replacement in the same breath.
     - Every number carries a proof entry. No proof, no number.
     - Where the evidence is contested, the note says so. */

const CHAPTERS = [
  { id: "say", label: "Your say" },
  { id: "why", label: "Why this works" },
  { id: "voice", label: "Your voice" },
  { id: "money", label: "Your money" },
  { id: "plate", label: "Your plate" },
  { id: "miles", label: "Your miles" },
  { id: "screen", label: "Your attention" },
  { id: "stuff", label: "Your stuff" },
  { id: "commit", label: "Your move" }
];

const PAGES = [
  {
    id: "feedback",
    kind: "feedback",
    chapter: "say",
    accent: "#8ecae6",
    menu: "Your say",
    eyebrow: "Your turn",
    title: "We'd love to hear from you!",
    lede: "How can we make this deck better? Tell us about an action that we should all do to make the world better. Any other feedback is welcome too.",
    fields: {
      name: "Your name (optional)",
      email: "Email, if you want an answer (optional)",
      message: "Your idea, or feedback"
    },
    send: "Send it",
    sending: "Sending…",
    empty: "Write something first.",
    thanks: "Thanks, message sent.",
    fail: "That did not go through. Try again in a minute.",
    visitsLabel: "visitors"
  },

  {
    id: "start",
    kind: "hero",
    chapter: "why",
    accent: "#ffd166",
    menu: "We change the world!",
    title: "We change the world!",
    lede: "Our actions change the future of our children, for better or for worse.",
    hint: "Swipe left to start. Swipe right to share your ideas."
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
      "You think you are outnumbered. You are not. Two out of three people want this, and almost everybody guesses the opposite.",
      "So everyone keeps quiet and waits for a law, a leader, a neighbour. Silence looks exactly like disagreement.",
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
    note: "Copying behaviour is what people do and how people learn. Lead by example.",
    proof: [
      { claim: "Three degrees of influence; the 57% figure comes from the Framingham social network data. Critics argue part of the pattern is clustering rather than influence, which is why the randomised cooperation experiments matter.", source: "Christakis & Fowler, social contagion review", url: "https://arxiv.org/abs/1109.5235" }
    ]
  },

  {
    id: "twenty-five",
    kind: "idea",
    chapter: "why",
    accent: "#ffb703",
    menu: "It takes a quarter of us",
    eyebrow: "The number that matters",
    title: "It takes 25% of us.",
    stat: { value: "25%", label: "of a group is enough to flip what the whole group treats as normal. At 21%, nothing moved at all." },
    body: [
      "Researchers paid groups to agree on a name, then slipped in a committed minority pushing a different one.",
      "Up to 21%, the old norm held. At 25%, the group flipped — and kept the new name.",
      "You never needed a majority. You needed a stubborn quarter."
    ],
    note: "Your class, your team, your street, your group chat. Count the people, divide by four. That is your target, and it is smaller than you think.",
    proof: [
      { claim: "Ten groups of 20 people; a committed minority of 25% tipped an established naming convention, with 72% uptake. The largest minority that failed was 21%; the smallest that succeeded was 25%.", source: "Centola, Becker, Brackbill & Baronchelli 2018, Science", url: "https://www.science.org/doi/10.1126/science.aas8827" }
    ]
  },

  {
    id: "three-five",
    kind: "idea",
    chapter: "why",
    accent: "#e07a5f",
    menu: "3.5% has never failed",
    eyebrow: "It has been counted",
    title: "3.5%, and it has never failed.",
    stat: { value: "3.5%", label: "of a population actively taking part. No campaign that reached it has ever failed." },
    body: [
      "Chenoweth and Stephan went through 323 campaigns between 1900 and 2006.",
      "Nonviolent campaigns succeeded 53% of the time. Violent ones, 26%. Every single campaign that got 3.5% of the population actively involved, won.",
      "3.5% of a country sounds enormous. 3.5% of your school is one classroom."
    ],
    note: "Chenoweth calls it a rule of thumb, not a law — most winning movements never reached 3.5%. The point stands: the number needed is nowhere near half.",
    proof: [
      { claim: "323 campaigns, 1900–2006: 53% of nonviolent campaigns succeeded against 26% of violent ones, and no campaign with active participation of at least 3.5% of the population failed. Chenoweth stresses it is a rule of thumb, not an iron law.", source: "Chenoweth & Stephan, via The Commons Social Change Library", url: "https://commonslibrary.org/chenoweth-3-5percent-rule/" }
    ]
  },

  {
    id: "talk",
    kind: "action",
    num: "01",
    chapter: "voice",
    accent: "#ff7b00",
    menu: "Break the silence",
    eyebrow: "Action 01",
    title: "Break the silence.",
    stat: { value: "65%", label: "rarely or never talk about the climate with family or friends. Most of them are worried about it." },
    body: [
      "Almost everyone agrees. Almost nobody says so. So we all sit here thinking we are the odd one.",
      "One conversation moves more than one shopping trip. People who talk about it learn what most scientists actually say — and then they talk about it more.",
      "Not a lecture. One sentence, the real reason, then change the subject."
    ],
    todo: [
      "When someone asks, tell them straight.",
      "Post the swap you made, not the thing you gave up.",
      "Cook for your friends. Nobody argues with good food."
    ],
    ask: "Will you tell one person this week why you are doing this?",
    plan: "When someone asks what I am up to, I tell them the real reason. Once, then I drop it.",
    pledge: "Tell people why",
    proof: [
      { claim: "65% of Americans say they rarely or never discuss global warming with family and friends, while 72% think it is happening.", source: "Yale Program on Climate Change Communication, Spring 2025", url: "https://climatecommunication.yale.edu/publications/climate-change-in-the-american-mind-beliefs-attitudes-spring-2025/toc/2/" },
      { claim: "Panel study of 905 US adults: discussing global warming raises perceived scientific agreement, which raises belief and worry, which raises discussion again — a social feedback loop.", source: "Goldberg, van der Linden, Maibach & Leiserowitz 2019, PNAS", url: "https://www.pnas.org/doi/10.1073/pnas.1906589116" }
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
    stat: { value: "3", label: "steps again. Kindness travels as far as any habit here. So does contempt." },
    body: [
      "A better world is not only a cooler one. It is one where people are decent to each other.",
      "Loneliness moves through a network like any other habit. So does the opposite. You hand out one of the two every day.",
      "Small acts of kindness are little effort, but can mean a lot to those around you."
    ],
    todo: [
      "Learn the name of the person who serves you.",
      "Hold the door. Say thanks out loud.",
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
    stat: { value: "1", label: "vote, one email, one meeting — this is the move that changes the default for everyone at once" },
    body: [
      "Your choices are set by what exists around you.",
      "You can only take the train if there is a train. You can only order the veggie option if somebody cooks one.",
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
    id: "bring-one",
    kind: "action",
    num: "04",
    chapter: "voice",
    accent: "#06d6a0",
    menu: "Bring one person",
    eyebrow: "Action 04",
    title: "Bring one person.",
    stat: { value: "×2", label: "every time you recruit one person who recruits one person. Ten rounds of that is a thousand people." },
    body: [
      "Sharing a link is not recruiting. Naming a person is.",
      "Pick someone who already half agrees. Tell them the one thing you picked and why you picked it.",
      "Then ask them for theirs, and check on them in a week. That is what makes a quarter of a group possible."
    ],
    todo: [
      "Name one person tonight. Message them, do not post.",
      "Tell them your one change, not the whole list.",
      "Ask them for theirs. Write it down."
    ],
    ask: "Will you ask one person, by name, this week?",
    plan: "Tonight I message one person, tell them my one change, and ask them what theirs is.",
    pledge: "Bring one person",
    proof: [
      { claim: "A committed 25% of a group flips its norms; recruitment is how a handful becomes a quarter.", source: "Centola, Becker, Brackbill & Baronchelli 2018, Science", url: "https://www.science.org/doi/10.1126/science.aas8827" },
      { claim: "Discussion with friends and family raises perceived scientific agreement, which raises further discussion.", source: "Goldberg, van der Linden, Maibach & Leiserowitz 2019, PNAS", url: "https://www.pnas.org/doi/10.1073/pnas.1906589116" }
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
      "The ones that bite have three things: an easy substitute, a visible product, and people who keep going after the news moves on.",
      "Bud Light drinkers walked and Coors Light rose 24.4%: the money moved next door and stayed. Target's footfall fell for months after it dropped its diversity programme. Tesla sold 28% fewer cars in Europe last year, in a growing electric market."
    ],
    note: "Rule: never drop a product without naming its replacement in the same breath.",
    proof: [
      { claim: "Sales fell 17% in the week ending 15 April 2023 and 24.6% over the four weeks ending 3 June 2023; AB InBev US revenue fell 10.5% that quarter, close to $400M. Coors Light +24.4%, Miller Lite +21%.", source: "Harvard Business Review, lessons from the Bud Light boycott", url: "https://hbr.org/2024/03/lessons-from-the-bud-light-boycott-one-year-later" },
      { claim: "Household panel data (NielsenIQ, 40–60k US households) shows regular pre-boycott buyers cut Bud Light volume by 34–37%, with partial switching to other beer.", source: "Janssen, Economics Letters 2026", url: "https://papers.ssrn.com/sol3/papers.cfm?abstract_id=5233331" },
      { claim: "Target foot traffic fell 9% year on year in February 2025 and stayed negative for months after its January 2025 DEI rollback; CEO Brian Cornell acknowledged the consumer response on the Q1 earnings call, and full-year net sales fell 1.7%.", source: "CNN Business, Target boycott coverage", url: "https://www.cnn.com/2025/04/21/business/target-boycott-jamal-bryant-minority-businesses" },
      { claim: "Tesla's European registrations fell about 28% across 2025, to roughly 235,000 cars, while the EU battery-electric market grew. Analysts attribute the fall to a mix of brand damage and an ageing, narrow model range.", source: "CNBC, Tesla Europe sales", url: "https://www.cnbc.com/2026/02/24/tesla-car-sales-elon-musk-europe-autos-trump-evs.html" }
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
    id: "the-57",
    kind: "action",
    num: "05",
    chapter: "money",
    accent: "#3d405b",
    menu: "Starve the worst",
    eyebrow: "Action 05",
    title: "57 companies. 80% of the carbon.",
    stat: { value: "80%", label: "of fossil CO2 since the Paris deal traces back to 57 producers" },
    body: [
      "Aramco 4.8%. Gazprom 3.3%. Coal India 3.0%. Chevron 3.0%. Exxon 2.8%. BP 2.2%. Six names, a sixth of the problem.",
      "They signed Paris, then dug faster. Most of them produce more now than before 2016.",
      "You cannot boycott a barrel of oil. You can stop handing them your fuel money, and stop lending them your savings."
    ],
    todo: [
      "Fill up anywhere but the top of that list.",
      "Electric where you can, and charge on a clean tariff.",
      "Then do the next page, which is where your real money is."
    ],
    ask: "Will you take your money out of the worst of them?",
    plan: "This weekend, I look up which fossil companies my bank and my pension are funding.",
    pledge: "Starve the worst",
    proof: [
      { claim: "57 entities linked to 80% of fossil and cement CO2, 2016–2022. Saudi Aramco 4.8%, Gazprom 3.3%, Coal India 3.0%, Chevron 3.0%, ExxonMobil 2.8%, BP 2.2%. 65% of state-owned and 55% of investor-owned producers raised output after Paris.", source: "InfluenceMap, Carbon Majors database", url: "https://influencemap.org/pressrelease/Carbon-Majors-57-fossil-fuel-and-cement-producers-linked-to-80-of-global-fossil-CO2-emissions-since-the-Paris-Agreement-27590" }
    ]
  },

  {
    id: "bank",
    kind: "action",
    num: "06",
    chapter: "money",
    accent: "#277da1",
    menu: "Your bank is drilling",
    eyebrow: "Action 06",
    title: "Your bank is drilling.",
    stat: { value: "$8.7tn", label: "lent to oil, gas and coal by the 65 biggest banks since the Paris deal. $906bn of it last year alone." },
    body: [
      "Your salary sleeps in a bank. Your pension sleeps in a fund. Both work the night shift, and this is the shift.",
      "JPMorgan Chase put in $58bn last year. Bank of America $47bn. Money for companies opening new fields rose 27%.",
      "Some went the other way: BNP Paribas cut 28%, UBS 36%. They move when looking like this gets expensive."
    ],
    norm: "Switching a current account takes one afternoon and costs nothing.",
    todo: [
      "Look your bank up in the Banking on Climate Chaos table.",
      "Move the current account to one that is not on it.",
      "Check your pension, then switch to the clean fund your provider already runs."
    ],
    ask: "Will you check your bank and your pension this month?",
    plan: "On Saturday morning, with coffee, I look up my bank and read what my pension is holding.",
    pledge: "Move my money",
    proof: [
      { claim: "The 65 largest banks put $906 billion into fossil fuels in 2025, up 8%, and $8.7 trillion since the Paris Agreement. JPMorgan Chase $58bn (+12.6%), Bank of America $47bn, MUFG third. Financing for fossil-expanding companies rose 27% to $508bn; BNP Paribas cut 28%, UBS 36%.", source: "Banking on Climate Chaos 2026, via Rainforest Action Network", url: "https://www.ran.org/press-releases/bocc26/" },
      { claim: "Bank-by-bank figures and the full dataset.", source: "Banking on Climate Chaos", url: "https://www.bankingonclimatechaos.org/" }
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
    stat: { value: "7.1%", label: "effective corporation tax rate paid by Amazon's five biggest UK divisions. You pay more than that on lunch." },
    body: [
      "One division took a £7.6m tax credit in a year it made £355m before tax. Amazon's answer: tax follows profit, not revenue.",
      "Worldwide, $1.7 trillion of corporate tax went missing between 2016 and 2021. Schools and hospitals are paid for by everybody who cannot do that.",
      "Sometimes a court disagrees. In 2024 the EU's highest court ruled €13.1bn of Apple's Irish tax breaks unlawful."
    ],
    todo: [
      "Coffee at the independent place, not the chain.",
      "Buy from the shop's own site, not the marketplace squeezing it.",
      "Ask your employer where its tax residence is."
    ],
    ask: "Will you buy your next coffee somewhere independent?",
    plan: "Tomorrow morning I walk the extra two minutes to the independent place.",
    pledge: "Buy independent",
    proof: [
      { claim: "Fair Tax Foundation analysis: Amazon's five largest UK divisions paid about £39m of corporation tax on £555m of pre-tax profit, an effective rate of 7.1%; Amazon UK Services received a £7.6m credit on £355m pre-tax profit. Amazon reports over £1bn of total UK direct taxes for 2024 and says corporation tax follows profit, not revenue.", source: "Fair Tax Foundation", url: "https://fairtaxmark.net/" },
      { claim: "Estimate of Amazon's UK profits and the resulting corporation tax gap, with Amazon's own disclosures and responses.", source: "Ethical Consumer, Amazon UK tax avoidance", url: "https://www.ethicalconsumer.org/ethical-campaigns-boycotts/amazon-uks-substantial-tax-avoidance" },
      { claim: "US$1.7 trillion of corporate tax lost to profit shifting between 2016 and 2021; over a quarter of it preventable by publishing the country-by-country reports governments already collect.", source: "Tax Justice Network, The State of Tax Justice 2025", url: "https://taxjustice.net/reports/the-state-of-tax-justice-2025/" },
      { claim: "On 10 September 2024 the Court of Justice of the European Union ruled that Ireland granted Apple unlawful state aid and ordered recovery of €13.1 billion. Note the parallel cases against Starbucks, Amazon and Fiat were annulled.", source: "Commission v Ireland, C-465/20 P", url: "https://www.cliffordchance.com/briefings/2024/09/apple-loses-the-13-billion-tax-ruling-state-aid-case.html" }
    ]
  },

  {
    id: "plastic",
    kind: "action",
    num: "08",
    chapter: "money",
    accent: "#e63946",
    menu: "Same name, six years",
    eyebrow: "Action 08",
    title: "Same name, six years running.",
    stat: { value: "537,719", label: "pieces of branded plastic counted off beaches and streets. Coca-Cola came first for the sixth year in a row." },
    body: [
      "Volunteers in 41 countries pick up the rubbish and read the labels. The same names come back every year.",
      "The 2023 top five: Coca-Cola, Nestlé, Unilever, PepsiCo, Mondelēz. Coca-Cola alone makes over 130 billion single-use bottles a year.",
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
      { claim: "2023 global brand audit: 8,804 volunteers in 41 countries counted 537,719 pieces of plastic waste. The Coca-Cola Company ranked first for the sixth consecutive year with 33,820 items, followed by Nestlé, Unilever, PepsiCo, Mondelēz, Mars, P&G, Danone, Altria and British American Tobacco.", source: "Break Free From Plastic, 2023 brand audit", url: "https://www.breakfreefromplastic.org/2024/02/07/bffp-movement-unveils-2023-global-brand-audit-results/" }
    ]
  },

  {
    id: "fashion",
    kind: "action",
    num: "09",
    chapter: "money",
    accent: "#bc6c25",
    menu: "Stop the haul",
    eyebrow: "Action 09",
    title: "Stop the haul.",
    stat: { value: "10%", label: "of global emissions come from fashion — more than all flights and all shipping combined" },
    body: [
      "Shein and Temu ship to your door through a customs loophole. A US congressional inquiry found Temu had no system to keep forced labour out of its supply chain.",
      "Brands make twice as much clothing as in 2000. Ghana receives 15 million used items a week and 40% are unsellable.",
      "The haul is the product. Not posting one is the cheapest thing on this list."
    ],
    todo: [
      "Before you buy: will I wear this thirty times?",
      "Secondhand first. Vinted, the charity shop, a friend's wardrobe.",
      "Fix it. A button takes ten minutes. Wash cold, skip the dryer."
    ],
    ask: "Will you buy nothing new to wear for a month?",
    plan: "For the next month, anything I wear comes from my own wardrobe or secondhand.",
    pledge: "No new clothes for a month",
    proof: [
      { claim: "Fashion accounts for about 10% of global carbon emissions, more than international flights and shipping combined, with over 92 million tonnes of waste a year; synthetics are 68% of fibres and a leading source of ocean microplastics; Ghana receives about 15 million second-hand items weekly, roughly 40% unsellable.", source: "Nature Reviews Earth & Environment", url: "https://www.nature.com/articles/s43017-020-0039-9" },
      { claim: "Bipartisan interim findings: Shein and Temu exploited the US de minimis rule so that nearly all parcels under $800 entered uninspected and duty-free, and Temu had no system to ensure compliance with the Uyghur Forced Labor Prevention Act. Both companies deny using forced labour.", source: "US House Select Committee on the CCP", url: "https://chinaselectcommittee.house.gov/media/press-releases/select-committee-releases-interim-findings-shein-temu-forced-labor" }
    ]
  },

  {
    id: "chocolate",
    kind: "action",
    num: "10",
    chapter: "money",
    accent: "#7f5539",
    menu: "Chocolate with a child in it",
    eyebrow: "Action 10",
    title: "There is a child in that chocolate.",
    stat: { value: "1.56m", label: "children work in cocoa in Ivory Coast and Ghana — 45% of all children in cocoa-growing households" },
    body: [
      "The big chocolate companies promised to end the worst of it by 2005. Then 2008. Then 2010. Then 2020. Then 2025.",
      "The cause is not mysterious. Cocoa farmers live on about $2 a day, so the family works instead of the child going to school.",
      "A few brands pay a price calculated to reach a living income. Same shelf, one euro more."
    ],
    todo: [
      "Look for a living income price, not only a logo.",
      "Tony's Open Chain brands, or Fairtrade with a living income price.",
      "Easter and Christmas: buy the good stuff by the box, and say why."
    ],
    ask: "Will you switch the chocolate you buy most often?",
    plan: "Next shop, the chocolate in my basket is one that pays a living income price.",
    pledge: "Better chocolate",
    proof: [
      { claim: "An estimated 1.56 million children are in child labour in cocoa growing in Côte d'Ivoire and Ghana, 45% of children living in cocoa-growing households, with about 1.48 million in hazardous work. The industry's Harkin-Engel deadline to end the worst forms has moved from 2005 to 2008, 2010, 2020 and 2025.", source: "NORC at the University of Chicago, for the US Department of Labor", url: "https://www.norc.org/research/projects/assessing-child-labor-in-west-africa-cocoa-farming.html" },
      { claim: "Background on child labour in cocoa and what does and does not reduce it.", source: "International Cocoa Initiative", url: "https://www.cocoainitiative.org/issues/child-labour-cocoa" },
      { claim: "Living Income Reference Price paid on top of the market price, calculated with Fairtrade, and opened to other brands through Tony's Open Chain.", source: "Tony's Chocolonely, living income model", url: "https://us.tonyschocolonely.com/pages/living-income-model" }
    ]
  },

  {
    id: "give",
    kind: "action",
    num: "11",
    chapter: "money",
    accent: "#90be6d",
    menu: "Give, and say so",
    eyebrow: "Action 11",
    title: "Give, and say what you give.",
    stat: { value: "$3,000", label: "to $5,500 is the modelled cost of saving one human life through the best-measured charities" },
    body: [
      "On a normal wage in a rich country you are among the richest few percent alive. Not an accusation, arithmetic.",
      "1% of your income is one night out. It is also somebody's malaria nets.",
      "Giving is invisible, so it does not spread. Say the number out loud and it starts to."
    ],
    note: "GiveWell's own caution: modelled estimates, rounded, and the cost per life rises over time.",
    todo: [
      "Set up 1% as a standing order. Automatic beats willpower.",
      "Choose on published evidence, not on an advert.",
      "Tell one person what you give. That is the part that multiplies."
    ],
    ask: "Will you set up 1% this month?",
    plan: "On payday I set up a standing order for 1% of my income to a charity that publishes its evidence.",
    pledge: "Give 1%",
    proof: [
      { claim: "GiveWell's models for top-charity grants typically estimate $3,000–$5,500 per life saved; figures are rounded and expected to rise over time.", source: "GiveWell, how much does it cost to save a life", url: "https://www.givewell.org/how-much-does-it-cost-to-save-a-life" },
      { claim: "The 10% Pledge, and a trial pledge starting at 1% of income; over 9,000 people have taken the 10% version.", source: "Giving What We Can", url: "https://www.givingwhatwecan.org/pledge" }
    ]
  },

  {
    id: "big-levers",
    kind: "idea",
    chapter: "plate",
    accent: "#ffb4a2",
    menu: "Some things count more",
    eyebrow: "Where to aim",
    title: "Some things count way more.",
    stat: { value: "2.4 t", label: "of CO2 saved a year by living without a car. Recycling everything you own saves 0.2 t." },
    body: [
      "59% of people think recycling is their best move. In rich countries it ranks 7th out of 9.",
      "The big ones are what you eat, what you fly and what you drive. One return flight across the Atlantic is 1.6 tonnes.",
      "Do the small stuff too. Just never let it stand in for the big stuff."
    ],
    proof: [
      { claim: "Living car-free saves about 2.4 tonnes CO2e a year, one avoided transatlantic return flight 1.6 tonnes, a plant-based diet about 0.8 tonnes; comprehensive recycling about 0.2 tonnes.", source: "Wynes & Nicholas 2017, via Lund University", url: "https://www.lunduniversity.lu.se/article/four-lifestyle-choices-most-reduce-your-carbon-footprint" },
      { claim: "59% of people named recycling as the best way to cut their footprint; for high-income countries it ranks 7th of 9.", source: "World Economic Forum / Ipsos survey", url: "https://www.weforum.org/stories/2021/05/climate-action-change-behaviour-impact-survey/" },
      { claim: "Ranking of climate-friendly choices for high-income countries.", source: "World Resources Institute", url: "https://www.wri.org/insights/climate-friendly-choices-ranked" }
    ]
  },

  {
    id: "beef",
    kind: "action",
    num: "12",
    chapter: "plate",
    accent: "#ef476f",
    menu: "Drop the beef",
    eyebrow: "Action 12",
    title: "Drop the beef.",
    stat: { value: "60 kg", label: "of CO2 per kg of beef. Peas: about 1 kg." },
    body: [
      "Biggest single change on your plate. Nothing else in the shop comes close.",
      "Methane from the cows is 49% of it. Water: 15,400 litres per kg, against 4,300 for chicken.",
      "You do not have to be perfect. People who swapped only their beef cut their food footprint by about 48%."
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
    num: "13",
    chapter: "plate",
    accent: "#f4845f",
    menu: "Drop the rest",
    eyebrow: "Action 13",
    title: "Then drop the rest.",
    stat: { value: "0.8 t", label: "of CO2 saved a year by eating plants instead of meat" },
    body: [
      "Beef first, because it is the worst. Going mostly plant-based is the biggest food change there is.",
      "Meat is roughly ten times worse than beans per kilo. Less grazing also means more forest left standing.",
      "Flip the default. Plants unless you decide otherwise."
    ],
    norm: "47% of German adults are eating less meat or none at all. This is already moving.",
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
      { claim: "2024 polling: 47% of German adults are actively reducing meat (39%) or eating none (8%); meat and dairy consumption are at record lows.", source: "Green Queen, German meat and dairy consumption", url: "https://www.greenqueen.com.hk/meat-milk-consumption-germany-plant-based-protein-flexitarian/" },
      { claim: "Telling people a behaviour is changing doubled meatless orders in a café field experiment, 34% against 17%. A UK replication failed to find the effect, and measured consumption changes are smaller, around 6.8%.", source: "Sparkman & Walton 2017, Psychological Science", url: "https://journals.sagepub.com/doi/abs/10.1177/0956797617719950" }
    ]
  },

  {
    id: "rainforest",
    kind: "action",
    num: "14",
    chapter: "plate",
    accent: "#2d6a4f",
    menu: "The forest is on your plate",
    eyebrow: "Action 14",
    title: "The forest is on your plate.",
    stat: { value: "80%", label: "of cleared land in the Amazon ends up as cattle pasture. Most of the soy on the rest is animal feed." },
    body: [
      "Rainforest does not become furniture. It becomes grazing.",
      "Beef is the single biggest driver of tropical forest loss. In the Amazon, about 80% of cleared land ends up under cattle.",
      "The soy growing on most of the rest is not for you either. It is feed."
    ],
    note: "Beans instead of beef is the same swap as two pages back. This is the second reason to make it.",
    todo: [
      "Beef out of the basket. Beans, lentils, chicken.",
      "Leather too: same cows, same land. Canvas or secondhand.",
      "Back the import rules on deforestation. They reach where shopping cannot."
    ],
    ask: "Will you keep beef out of the basket for good?",
    plan: "When I shop, beef stays out of the basket and beans go in instead.",
    pledge: "No more beef",
    proof: [
      { claim: "Beef is the largest single driver of tropical deforestation; in the Amazon roughly 80% of cleared land becomes cattle pasture, and soy — the second driver — is overwhelmingly grown as animal feed.", source: "Our World in Data, drivers of deforestation", url: "https://ourworldindata.org/drivers-of-deforestation" }
    ]
  },

  {
    id: "upf",
    kind: "action",
    num: "15",
    chapter: "plate",
    accent: "#d62828",
    menu: "This is not food",
    eyebrow: "Action 15",
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
    id: "food-waste",
    kind: "action",
    num: "16",
    chapter: "plate",
    accent: "#52b788",
    menu: "Eat what you buy",
    eyebrow: "Action 16",
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
    id: "flying",
    kind: "action",
    num: "17",
    chapter: "miles",
    accent: "#577590",
    menu: "Fly less",
    eyebrow: "Action 17",
    title: "Fly way less.",
    stat: { value: "1.6 t", label: "of CO2 for one return long-haul flight — more than a whole year of some people's emissions" },
    body: [
      "Nothing you do in a day cancels a long-haul flight. One boarding pass beats a year of careful shopping.",
      "It is also wildly unequal: about 1% of people cause over half of all aviation emissions. In the Netherlands, 8% of people take 42% of the flights.",
      "So spend your flights on purpose. Fewer trips, longer stays. Better trips anyway."
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
      { claim: "One avoided transatlantic return flight saves about 1.6 tonnes CO2e.", source: "Wynes & Nicholas 2017, via Lund University", url: "https://www.lunduniversity.lu.se/article/four-lifestyle-choices-most-reduce-your-carbon-footprint" },
      { claim: "At most 1% of the world's population causes more than half of passenger aviation emissions; 11% flew at all in 2018. Within countries the split repeats: 15% of people take 70% of UK flights, 8% take 42% of Dutch flights.", source: "Gössling & Humpe 2020, via Transport & Environment", url: "https://www.transportenvironment.org/articles/1-super-emitters-responsible-over-50-aviation-emissions" }
    ]
  },

  {
    id: "driving",
    kind: "action",
    num: "18",
    chapter: "miles",
    accent: "#43aa8b",
    menu: "Drive less",
    eyebrow: "Action 18",
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
    id: "bedroom",
    kind: "action",
    num: "19",
    chapter: "screen",
    accent: "#4361ee",
    menu: "Phones out of the bedroom",
    eyebrow: "Action 19",
    title: "Phones sleep in the kitchen.",
    stat: { value: "1.79×", label: "the odds of not getting enough sleep, from simply having a phone in the room. Switched off. Untouched." },
    body: [
      "Twenty studies, 125,000 children, one answer: the phone in the room costs sleep even when you never pick it up.",
      "You cannot go quiet alone. Stop answering at midnight while nobody else does, and you just miss things.",
      "So make it a rule for the group, not a rule for yourself. Nothing after eleven. Everybody sleeps."
    ],
    note: "Snapshots, not experiments: this is a link, not a proven cause. It is still 125,000 children pointing one way.",
    todo: [
      "Charger in the kitchen. Buy a cheap alarm clock.",
      "Agree a curfew with the group chat, and say when you go.",
      "Phones off the table at dinner. Yours first."
    ],
    ask: "Will your phone sleep outside your bedroom tonight?",
    plan: "Tonight my phone charges in the kitchen and I use a normal alarm clock.",
    pledge: "Phone out of the bedroom",
    proof: [
      { claim: "Meta-analysis of 20 cross-sectional studies, 125,198 children, mean age 14.5: bedtime media device use is associated with inadequate sleep (OR 2.17), poor sleep quality (OR 1.46) and daytime sleepiness (OR 2.72). Mere access without use: OR 1.79 for inadequate sleep. Cross-sectional, so association rather than proven cause.", source: "Carter et al. 2016, JAMA Pediatrics", url: "https://jamanetwork.com/journals/jamapediatrics/fullarticle/2571467" }
    ]
  },

  {
    id: "feed",
    kind: "action",
    num: "20",
    chapter: "screen",
    accent: "#c77dff",
    menu: "Cut one feed",
    eyebrow: "Action 20",
    title: "Cut one feed.",
    stat: { value: "+7%", label: "severe depression on a campus in the two years after Facebook arrived there" },
    body: [
      "Researchers followed Facebook's rollout college by college. The campuses that got it got worse, through comparing yourself with other people.",
      "You are not weak. The feed is tuned to hold you, by people paid to make it hold you.",
      "Delete the worst one for a month. Then tell people you did — that is the part that spreads."
    ],
    note: "That is 2004 Facebook and college students, and short experiments on cutting back are mixed. Test it on your own week.",
    todo: [
      "Pick your worst app. Off the phone for a month.",
      "Kill every notification that is not a person.",
      "Follow ten fewer strangers. Message one real friend instead."
    ],
    ask: "Will you delete your worst app for a month?",
    plan: "Tonight I delete the app that eats my evenings. It comes back in a month, or it does not.",
    pledge: "Cut one feed",
    proof: [
      { claim: "Facebook's staggered college rollout, 430,000 survey responses: access increased severe depression by about 7% and worsened a mental-health index by 0.085 standard deviations, driven by unfavourable social comparison.", source: "Braghieri, Levy & Makarin 2022, American Economic Review", url: "https://www.aeaweb.org/articles?id=10.1257/aer.20211218" },
      { claim: "Large randomised deactivation experiment on Facebook and Instagram, for comparison with the rollout estimates.", source: "NBER working paper 33697", url: "https://www.nber.org/papers/w33697" }
    ]
  },

  {
    id: "betting",
    kind: "action",
    num: "21",
    chapter: "screen",
    accent: "#d00000",
    menu: "Delete the betting app",
    eyebrow: "Action 21",
    title: "Delete the betting app.",
    stat: { value: "48%", label: "of American men aged 18 to 49 hold an online sportsbook account. About 90% of bets are placed on a phone." },
    body: [
      "Live odds, free-bet offers, push notifications at half time. It is a slot machine wearing a football shirt.",
      "Phone bettors have about 2.4 times the odds of a gambling problem. One in five people with the disorder attempts or dies by suicide.",
      "Four in five young Britons have seen gambling ads. Much of that advertising is bet slips, posted free, by friends."
    ],
    todo: [
      "Delete the apps tonight. Then self-exclude — five minutes.",
      "Never post a bet slip. That is their marketing, done free.",
      "Mute the gambling sponsors and watch the match."
    ],
    ask: "Will you delete the betting apps this week?",
    plan: "Tonight I delete every betting app on my phone and register a self-exclusion.",
    pledge: "No betting apps",
    proof: [
      { claim: "US sports betting went from under $5bn a year before 2018 to about $150bn; roughly 90% of bets are placed on phones; 22% of Americans and 48% of men aged 18–49 hold an online sportsbook account; gambling disorder carries a suicide attempt or completion rate of about one in five.", source: "Harvard Magazine, gambling as a public health crisis", url: "https://www.harvardmagazine.com/2025/03/harvard-research-gambling-public-health-crisis" },
      { claim: "Phone sports bettors had about 2.4 times the odds of gambling problems compared with peers who did not bet on sports; helpline calls after online expansion rose almost entirely among adolescent boys and young men.", source: "STAT News, sports betting apps", url: "https://www.statnews.com/2025/11/11/sports-betting-apps-public-health-crisis/" },
      { claim: "79% of young people in Great Britain have seen or heard gambling advertising, 74% of them online: apps 63%, social media 56%, streaming 42%.", source: "UK Gambling Commission, Young People and Gambling 2025", url: "https://www.gamblingcommission.gov.uk/report/young-people-and-gambling-2025-official-statistics/ypg-2025-young-peoples-exposure-to-gambling-recall-of-gambling-advertising" }
    ]
  },

  {
    id: "parent-pact",
    kind: "action",
    num: "22",
    chapter: "screen",
    accent: "#4cc9f0",
    menu: "The parent pact",
    eyebrow: "Action 22",
    title: "Nobody wants to be the only kid without one.",
    stat: { value: "10", label: "families in the same school year. That is all it takes to switch the pledge on, so no child stands alone." },
    body: [
      "Every parent says the same sentence: I would wait, but mine would be the only one.",
      "That is not a parenting problem. It is a coordination problem, and coordination has a fix.",
      "Wait Until 8th only switches on once ten families in your child's year sign. 155,000 families have."
    ],
    note: "Whether school phone bans help mental health is contested, and this page does not claim they do. Only this: waiting together is easy, waiting alone is brutal.",
    todo: [
      "Talk to two parents at the gate. In person, not in the chat.",
      "Sign a delay pledge together. Name the year, in writing.",
      "Give them a phone that calls and texts. It still works."
    ],
    ask: "Will you ask two other parents this week?",
    plan: "At pick-up this week I ask two other parents whether they will wait with us.",
    pledge: "Wait on the smartphone",
    proof: [
      { claim: "The pledge activates once ten families from the same school and grade have signed, and the families are then put in touch; more than 155,000 parents have signed.", source: "Wait Until 8th", url: "https://www.waituntil8th.org/" },
      { claim: "Summary of the evidence on smartphone-free schools, including the UK SMART Schools study, which found no association between restrictive school policies and better wellbeing, alongside the studies that report benefits.", source: "Smartphone Free Childhood, evidence page", url: "https://www.smartphonefreechildhood.org/resource/smartphone-free-schools-evidence" }
    ]
  },

  {
    id: "home-energy",
    kind: "action",
    num: "23",
    chapter: "stuff",
    accent: "#f9c74f",
    menu: "Fix your home energy",
    eyebrow: "Action 23",
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
    id: "phone-life",
    kind: "action",
    num: "24",
    chapter: "stuff",
    accent: "#8d99ae",
    menu: "Keep the phone five years",
    eyebrow: "Action 24",
    title: "Keep the phone five years.",
    stat: { value: "80%", label: "of a phone's lifetime carbon is already spent before you open the box" },
    body: [
      "Mining, refining, fabrication, shipping. The charging is the small part.",
      "Keeping a phone five years instead of three cuts its impact per year by about a third.",
      "One extra year on every phone on earth would be worth roughly 4.7 million cars taken off the road."
    ],
    todo: [
      "New battery, not a new phone. It costs a tenth as much.",
      "Buying anyway? Refurbished. Same device, half the price.",
      "Case and screen protector. Boring, works."
    ],
    ask: "Will you keep your current phone another year?",
    plan: "When this phone starts to slow down, I replace the battery first and give it another year.",
    pledge: "Keep my phone longer",
    proof: [
      { claim: "Life cycle assessment for Fairphone: production dominates a phone's footprint, and using a phone for five years instead of three cuts its global warming impact per year of use by around 31%.", source: "Fraunhofer IZM", url: "https://www.izm.fraunhofer.de/en/news/keeping-phones-for-5-years-cuts-yearly-impact-on-global-warming.html" },
      { claim: "Manufacturing accounts for roughly 80% of a smartphone's lifetime emissions; extending the life of the world's smartphones by one year would save emissions comparable to taking 4.7 million cars off the road by 2030, and repair beats recycling for e-waste.", source: "World Economic Forum, repair not recycle", url: "https://www.weforum.org/stories/circular-economy/repair-not-recycle-tackle-ewaste-circular-economy-smartphones/" }
    ]
  },

  {
    id: "no-list",
    kind: "idea",
    chapter: "commit",
    accent: "#f4a261",
    menu: "The no list",
    eyebrow: "One screen",
    title: "The no list.",
    body: [
      "The whole deck, on one screen. Screenshot it, send it to one person.",
      "Every no has a yes beside it. Even the biggest journey starts with a single step."
    ],
    todoTitle: "Stop these",
    todo: [
      "No beef. Beans, lentils, chicken.",
      "No haul. Secondhand, or the wardrobe you own.",
      "No betting app. Just watch the match.",
      "No chain coffee. The independent place.",
      "No bank that funds coal. The one that does not.",
      "No single-use bottle. Tap water, free.",
      "No phone in the bedroom. Alarm clock."
    ],
    note: "Pick one. One, starting this week — and tell somebody which."
  },

  {
    id: "pledge",
    kind: "pledge",
    chapter: "commit",
    accent: "#ffd166",
    menu: "Your pledge",
    eyebrow: "Now the real part",
    title: "So what are you doing?",
    empty: "Nothing picked yet. Swipe back and answer one of the questions with 'Yes, I am in'.",
    lede: "You said yes to these:",
    outro: "Now tell one person, by name, which one you picked. A plan with a witness is the kind that survives."
  },

  {
    id: "sources",
    kind: "sources",
    chapter: "commit",
    accent: "#8ecae6",
    menu: "Sources",
    eyebrow: "Check it yourself",
    title: "Sources",
    lede: "Every number in this deck comes from one of these."
  }
];
