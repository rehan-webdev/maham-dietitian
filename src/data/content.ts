export const INSTAGRAM_URL = 'https://www.instagram.com/maham.bridaldietitian/';
export const INSTAGRAM_HANDLE = '@maham.bridaldietitian';
export const EATWELL_URL =
  'https://www.nhs.uk/live-well/eat-well/food-guidelines-and-food-labels/the-eatwell-guide/';

export const images = {
  hero: '/images/bridal-hero.jpg',
  nourish: '/images/nourish-editorial.jpg',
  breakfast:
    'https://images.pexels.com/photos/6823369/pexels-photo-6823369.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=800',
  journal:
    'https://images.pexels.com/photos/26664913/pexels-photo-26664913.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=800',
  water:
    'https://images.pexels.com/photos/7530797/pexels-photo-7530797.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=800',
  salad:
    'https://images.pexels.com/photos/1484519/pexels-photo-1484519.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=800',
};

export interface ProgramStep {
  id: string;
  title: string;
  body: string;
  action: string;
}

export interface Program {
  id: string;
  number: string;
  tag: string;
  title: string;
  intro: string;
  image: string;
  imageAlt: string;
  imagePosition?: string;
  focus: string;
  steps: ProgramStep[];
  relatedArticle: string;
}

export const programs: Program[] = [
  {
    id: 'bridal-foundation',
    number: '01',
    tag: 'BEFORE THE BIG DAY',
    title: 'The Bridal Foundation',
    intro: 'Make room for nourishing meals and a little more calm in the beautiful, busy lead-up.',
    image: images.hero,
    imageAlt: 'Ivory bridal embroidery and a bouquet of blush garden roses',
    imagePosition: '88% 54%',
    focus: 'A gentle starting point for building a food routine around wedding planning, not the other way around.',
    relatedArticle: 'balanced-bridal-plate',
    steps: [
      {
        id: 'foundation-1',
        title: 'Notice your everyday rhythm',
        body: 'Think about a typical day. When is it easy to eat, and when do appointments or errands get in the way? This is information, not a scorecard. You do not need to count calories or weigh yourself.',
        action: 'Choose one busy part of your day and plan an easy meal or snack for it.',
      },
      {
        id: 'foundation-2',
        title: 'Build meals you actually enjoy',
        body: 'Aim for variety across the day: starchy foods for energy, a source of protein, fruit or vegetables, and some fats. Familiar foods such as roti, rice, dal, yoghurt, and seasonal sabzi all have a place.',
        action: 'Write down three familiar meals that are satisfying and practical for you.',
      },
      {
        id: 'foundation-3',
        title: 'Keep the basics within reach',
        body: 'A stocked cupboard can make a busy week easier. Think oats, rice, lentils, tinned beans, frozen vegetables, and a few foods you love. Keep drinking water accessible, too.',
        action: 'Add a few reliable meal ingredients and portable snacks to your shopping list.',
      },
      {
        id: 'foundation-4',
        title: 'Let consistency be flexible',
        body: 'Celebrations and changing plans are part of life. A routine should support you, not make you feel guilty. After a different kind of day, simply return to your usual meals without compensating or skipping food.',
        action: 'Choose one helpful habit to carry into next week, and let the rest be a work in progress.',
      },
    ],
  },
  {
    id: 'everyday-glow',
    number: '02',
    tag: 'NOURISH YOUR EVERYDAY',
    title: 'The Everyday Glow',
    intro: 'Find your feel-good rhythm with colourful food, simple rituals, and kinder expectations.',
    image: images.nourish,
    imageAlt: 'A colourful chickpea salad, fresh rose, and lemon water on ivory linen',
    imagePosition: 'center 62%',
    focus: 'Small, realistic ways to support your wellbeing. Here, "glow" means feeling cared for, not a promise of flawless skin.',
    relatedArticle: 'hydration-without-hype',
    steps: [
      {
        id: 'glow-1',
        title: 'Add a little variety',
        body: 'Different foods offer different nutrients. Fresh, frozen, and tinned produce can all help you add variety. There is no single bridal superfood, and an expensive shopping list is not required.',
        action: 'Add one fruit or vegetable you enjoy to a meal or snack today.',
      },
      {
        id: 'glow-2',
        title: 'Make hydration ordinary',
        body: 'Water does not need a detox label. Drink regularly through the day and adjust to heat, activity, and your own needs. If you have been given a fluid restriction, follow your clinician\'s advice instead.',
        action: 'Place a glass or bottle of water somewhere you will naturally see it.',
      },
      {
        id: 'glow-3',
        title: 'Leave space for rest',
        body: 'Food is only one part of feeling well. A regular wind-down, moments of quiet, and enjoyable movement can belong in your routine without becoming another list to perfect.',
        action: 'Make ten minutes for a restful activity you genuinely enjoy.',
      },
      {
        id: 'glow-4',
        title: 'Skip the last-minute experiments',
        body: 'New supplements, restrictive cleanses, and unfamiliar routines are not prerequisites for a wedding. Supplements may interact with medicines, and individual skin concerns deserve appropriate professional care.',
        action: 'Keep one familiar, helpful routine instead of adding a new bridal "must-do".',
      },
    ],
  },
  {
    id: 'beyond-the-wedding',
    number: '03',
    tag: 'FOR ALL YOUR CHAPTERS',
    title: 'Beyond the Wedding',
    intro: 'Carry the good things forward. Feel-good habits for a life that is full, flexible, and yours.',
    image: images.breakfast,
    imageAlt: 'A generous yoghurt bowl with berries, oats, and seeds',
    imagePosition: 'center 48%',
    focus: 'A thoughtful reset for everyday life, whether your wedding is behind you or you simply want a sustainable place to begin.',
    relatedArticle: 'berry-breakfast-bowl',
    steps: [
      {
        id: 'beyond-1',
        title: 'Keep what feels supportive',
        body: 'Look back at the routines that helped you feel nourished. You do not have to keep every habit or follow a rigid schedule. Pick the things that fit your life now.',
        action: 'Choose one food routine you would like to keep, change, or simplify.',
      },
      {
        id: 'beyond-2',
        title: 'Build your easy-meal collection',
        body: 'A few dependable meals can reduce decision fatigue. Include options for days when you want to cook and days when you do not. Convenience foods can be part of a balanced pattern.',
        action: 'Save three easy meals, including one that takes little or no cooking.',
      },
      {
        id: 'beyond-3',
        title: 'Make room for shared food',
        body: 'Meals also offer pleasure, culture, and connection. Eating out and celebrating are not failures of a nutrition routine. Flexibility makes a routine more useful in real life.',
        action: 'Plan a meal you look forward to, on your own or with someone you love.',
      },
      {
        id: 'beyond-4',
        title: 'Check in with kindness',
        body: 'Your needs and circumstances will change. Rather than tracking your appearance, notice practical things: whether you have enough time to eat, whether meals satisfy you, and what support would help.',
        action: 'Ask yourself: "What would make feeding myself a little easier this week?"',
      },
    ],
  },
];

export type ArticleCategory = 'Nutrition' | 'Bridal Wellbeing' | 'Recipes';

export interface Recipe {
  prep: string;
  ingredients: { quantity: number; unit: string; name: string }[];
  steps: string[];
  note: string;
}

export interface Article {
  id: string;
  category: ArticleCategory;
  title: string;
  excerpt: string;
  image: string;
  imageAlt: string;
  imagePosition?: string;
  readTime: string;
  sections: { heading: string; body: string }[];
  recipe?: Recipe;
  source?: { label: string; url: string };
}

export const articles: Article[] = [
  {
    id: 'balanced-bridal-plate',
    category: 'Nutrition',
    title: 'Your bridal plate, without the rules',
    excerpt: 'More nourishment. Less noise. A simple way to think about balanced meals.',
    image: images.nourish,
    imageAlt: 'Fresh chickpea salad beside a blush rose and a glass of water',
    imagePosition: 'center 68%',
    readTime: '4 min read',
    source: { label: 'NHS: The Eatwell Guide', url: EATWELL_URL },
    sections: [
      {
        heading: 'Start with addition, not subtraction',
        body: 'Wedding planning comes with enough decisions. Your meals do not need another set of strict rules. Instead of asking what to cut out, ask what might help a meal feel satisfying: a source of energy, some protein, fruit or vegetables, and the flavours you enjoy.',
      },
      {
        heading: 'Familiar food belongs here',
        body: 'Roti with dal and sabzi, rice with chicken and a side salad, or a jacket potato with beans can all be part of a varied pattern. You do not need to swap the food you grew up with for unfamiliar ingredients. Balance is about the overall day or week, not making every plate look the same.',
      },
      {
        heading: 'Give carbohydrates a place',
        body: 'Potatoes, bread, rice, and other starchy foods provide energy and useful nutrients. Higher-fibre or wholegrain choices can add fibre when they suit you. Pair them with foods such as eggs, lentils, fish, tofu, or yoghurt, and build from there.',
      },
      {
        heading: 'There is room for celebration',
        body: 'A piece of wedding cake does not undo a balanced routine. Food is part of culture and connection, too. Aim for variety and regular opportunities to eat, rather than trying to earn, compensate for, or perfect each meal.',
      },
      {
        heading: 'Your needs are individual',
        body: 'These are general ideas for adults, not a personalised meal plan. If you have a medical condition, food allergy, pregnancy-related needs, or a difficult relationship with food, a qualified clinician or dietitian can help adapt advice safely.',
      },
    ],
  },
  {
    id: 'gentler-bridal-routine',
    category: 'Bridal Wellbeing',
    title: '5 gentle habits for the busy bride',
    excerpt: 'A little more care, a little less pressure. Small rituals for your bridal chapter.',
    image: images.journal,
    imageAlt: 'A quiet moment journaling beside coffee and white tulips',
    readTime: '4 min read',
    sections: [
      {
        heading: '1. Give meals a little room in the diary',
        body: 'When your day fills with fittings and appointments, meals can become an afterthought. Protect a few natural pauses to eat. Keep something portable nearby for the days that change at the last minute.',
      },
      {
        heading: '2. Make one thing easier',
        body: 'Wash some fruit, stock a favourite snack, or keep ingredients for an easy meal at home. One small convenience is more useful than a complicated plan that never fits your week.',
      },
      {
        heading: '3. Create a softer evening',
        body: 'You do not need an elaborate routine. Put wedding tasks aside for a little while, settle into something familiar, and give yourself permission to rest. If sleep difficulties persist, ask a healthcare professional for support.',
      },
      {
        heading: '4. Curate a kinder feed',
        body: 'Notice how bridal content makes you feel. Mute accounts that add pressure about your body or imply that you need to transform before you deserve to be celebrated. Your attention is yours to protect.',
      },
      {
        heading: '5. Let people help',
        body: 'Ask a friend to bring lunch to a long appointment day or share a planning task. Being supported is not another thing to achieve. It is a little space to feel like yourself again.',
      },
    ],
  },
  {
    id: 'berry-breakfast-bowl',
    category: 'Recipes',
    title: 'A breakfast worth slowing down for',
    excerpt: 'A berry and yoghurt bowl that is as simple as it is lovely.',
    image: images.breakfast,
    imageAlt: 'A ceramic bowl of yoghurt topped with mixed berries and granola',
    readTime: '5 min prep',
    sections: [
      {
        heading: 'A calm start, in one bowl',
        body: 'Creamy yoghurt, oats, and your favourite berries make a simple starting point for breakfast. Use fresh or thawed frozen fruit, and change the toppings to suit your appetite, preferences, and what you have at home.',
      },
    ],
    recipe: {
      prep: '5 minutes',
      ingredients: [
        { quantity: 150, unit: 'g', name: 'plain yoghurt or a suitable fortified alternative' },
        { quantity: 40, unit: 'g', name: 'rolled oats or your favourite granola' },
        { quantity: 80, unit: 'g', name: 'mixed berries, fresh or thawed' },
        { quantity: 1, unit: 'tsp', name: 'seeds of your choice, optional' },
      ],
      steps: [
        'Spoon the yoghurt into a bowl.',
        'Add the oats or granola, then top with berries.',
        'Finish with seeds if you enjoy them. Adjust the amount to your appetite and enjoy.',
      ],
      note: 'Contains milk if made with dairy yoghurt. Check oats, granola, seeds, and alternatives for your own allergens; use certified gluten-free oats if required. Refrigerate dairy and thawed fruit appropriately.',
    },
  },
  {
    id: 'hydration-without-hype',
    category: 'Nutrition',
    title: 'Hydration, without the hype',
    excerpt: 'You do not need a special drink. Just an everyday habit that works for you.',
    image: images.water,
    imageAlt: 'Fresh lemon being squeezed into a simple glass of water',
    readTime: '3 min read',
    source: {
      label: 'NHS: Water, drinks and hydration',
      url: 'https://www.nhs.uk/live-well/eat-well/food-guidelines-and-food-labels/water-drinks-nutrition/',
    },
    sections: [
      {
        heading: 'Keep it simple',
        body: 'Regular drinks through the day can help you stay hydrated. Water is a practical choice, and other drinks also contribute. Lemon or cucumber can add flavour if you enjoy them, but they do not turn water into a detox treatment.',
      },
      {
        heading: 'Let your routine help',
        body: 'Keep a drink within reach during desk work, bring a bottle to longer appointments, and have a drink with meals. Gentle reminders are often more useful than trying to follow a rigid challenge.',
      },
      {
        heading: 'Your needs can change',
        body: 'Hot weather, activity, illness, pregnancy, and breastfeeding can affect how much fluid you need. General guidance is only a starting point. If a healthcare professional has recommended a fluid restriction or an individual target, follow that advice.',
      },
      {
        heading: 'No promises, no pressure',
        body: 'Drinking excessive water is not a shortcut to clear skin or rapid weight loss and can be harmful. Persistent thirst, dizziness, or other concerning symptoms deserve medical advice rather than a new wellness trend.',
      },
    ],
  },
  {
    id: 'your-wedding-morning',
    category: 'Bridal Wellbeing',
    title: 'A little care for your wedding morning',
    excerpt: 'Make space for breakfast, water, and a breath between the beautiful moments.',
    image: images.hero,
    imageAlt: 'A bride holding a soft pink and ivory rose bouquet',
    imagePosition: '88% center',
    readTime: '3 min read',
    sections: [
      {
        heading: 'Choose something familiar',
        body: 'A busy wedding morning is not the time to test a restrictive plan or an unfamiliar supplement. Choose a breakfast you normally enjoy and tolerate. Toast and eggs, porridge, or yoghurt with fruit are a few possible starting points.',
      },
      {
        heading: 'Nominate a nourishment friend',
        body: 'Ask someone you trust to make sure food and drinks are available while you get ready. If you have food allergies or a medical diet, confirm ingredients and arrangements in advance rather than relying on last-minute substitutions.',
      },
      {
        heading: 'Plan for the spaces between',
        body: 'Photos and ceremonies may run longer than expected. Keep a familiar, safely stored snack available, and plan where you will have your next meal. Your appetite may feel different when you are excited; a little flexibility helps.',
      },
      {
        heading: 'You are allowed to enjoy the day',
        body: 'There is no need to skip meals to change how your outfit fits, or to earn the food you eat later. You deserve to feel comfortable, cared for, and present for your celebration.',
      },
    ],
  },
  {
    id: 'everyday-chickpea-bowl',
    category: 'Recipes',
    title: 'The everyday chickpea bowl',
    excerpt: 'Colourful, adaptable, and ready in about ten minutes.',
    image: images.salad,
    imageAlt: 'A fresh vegetable bowl with avocado and colourful salad ingredients',
    readTime: '10 min prep',
    sections: [
      {
        heading: 'An easy lunch to make your own',
        body: 'A chickpea bowl is a flexible way to use what is in the fridge. Serve it with bread, roti, or a grain you enjoy for a more substantial meal. Swap vegetables and seasoning freely; there is no perfect version.',
      },
    ],
    recipe: {
      prep: '10 minutes',
      ingredients: [
        { quantity: 120, unit: 'g', name: 'tinned chickpeas, drained and rinsed' },
        { quantity: 80, unit: 'g', name: 'cucumber, chopped' },
        { quantity: 80, unit: 'g', name: 'cherry tomatoes, halved' },
        { quantity: 1, unit: 'handful', name: 'washed leafy greens' },
        { quantity: 1, unit: 'tsp', name: 'olive oil' },
        { quantity: 2, unit: 'tsp', name: 'lemon juice, or to taste' },
      ],
      steps: [
        'Combine the chickpeas, cucumber, tomatoes, and greens in a bowl.',
        'Mix the olive oil and lemon juice, then toss through the salad.',
        'Season to your preference and serve with bread, roti, or a grain of your choice. Adjust portions to your appetite.',
      ],
      note: 'Check all ingredients and accompaniments for your own allergens. Refrigerate leftovers promptly in a sealed container and use within two days.',
    },
  },
];

export const plannerItems = [
  { id: 'plan-1', group: 'Before the day', text: 'Keep ingredients for a few familiar, satisfying meals at home.' },
  { id: 'plan-2', group: 'Before the day', text: 'Pack a snack for long appointments or errands.' },
  { id: 'plan-3', group: 'Before the day', text: 'Confirm any food allergies or dietary needs with the caterer.' },
  { id: 'plan-4', group: 'On the day', text: 'Make room for a familiar breakfast before getting ready.' },
  { id: 'plan-5', group: 'On the day', text: 'Ask a trusted person to keep food and water within reach.' },
  { id: 'plan-6', group: 'On the day', text: 'Take a quiet moment to pause and enjoy your meal.' },
  { id: 'plan-7', group: 'Beyond the wedding', text: 'Return to regular meals without compensating for celebrations.' },
  { id: 'plan-8', group: 'Beyond the wedding', text: 'Keep one small routine that makes eating well easier.' },
  { id: 'plan-9', group: 'Beyond the wedding', text: 'Make space for rest, connection, and foods you love.' },
];

export const faqItems = [
  {
    question: 'When should I start thinking about bridal nutrition?',
    answer: 'There is no perfect countdown. Start when it feels useful, with small routines that support your everyday life. Even close to your wedding, regular meals, familiar foods, and time to rest matter more than a last-minute overhaul. There is no need to change your body for your day.',
  },
  {
    question: 'Will I have to give up the foods I love?',
    answer: 'No food blacklist here. These resources focus on variety, satisfying meals, and practical habits. Your cultural foods, favourite meals, and celebrations can all have a place. If you have an allergy or a medical condition, follow the individual guidance of your healthcare professional.',
  },
  {
    question: 'Are the programs personalised meal plans?',
    answer: 'The programs on this website are free, self-guided educational paths. They include reading, small actions, and a checklist you can save on your device. They are not clinical consultations, individual meal prescriptions, or a guarantee of any body or skin outcome. For Maham\'s current professional services, please check the linked Instagram profile.',
  },
  {
    question: 'What if I have PCOS, diabetes, or a food allergy?',
    answer: 'Your needs deserve individual attention. Please work with a suitably qualified dietitian or your treating clinician before changing your diet, supplements, or medication. The general information here is not a treatment for PCOS, diabetes, allergies, or any other medical condition.',
  },
  {
    question: 'Can I use these resources after my wedding?',
    answer: 'Absolutely. The Beyond the Wedding path is designed around flexible, everyday nourishment. You do not need to be engaged or planning a wedding to read the journal, try a recipe, or use the free resources.',
  },
  {
    question: 'Do I need an account to download or save anything?',
    answer: 'No account, email, or payment is needed. The guides download directly as PDFs. Saved articles and checklist progress stay in this browser when local storage is available; they are not sent to us or synced between devices. You can clear them at any time in Privacy & your data.',
  },
];

export const guideSections = [
  {
    title: 'Begin with nourishment',
    intro: 'Your wedding is a chapter, not a deadline for your body. Let these pages be a small source of support, not another set of rules.',
    points: [
      ['Make meals possible', 'Plan regular opportunities to eat. Keep familiar, practical meals and snacks available around busy appointments.'],
      ['Build a little variety', 'Across the day or week, include starchy foods, protein sources, fruit and vegetables, dairy or suitable alternatives, and some unsaturated fats.'],
      ['Keep your own food culture', 'Rice, roti, dal, sabzi, yoghurt, and foods from your own traditions can belong in a balanced pattern.'],
      ['Choose enough, not perfect', 'Use your appetite and needs as a starting point. No calorie target, crash diet, or bridal body deadline is required.'],
    ],
  },
  {
    title: 'Your everyday rhythm',
    intro: 'Helpful habits are the ones that make real life easier. Choose one to try; you do not have to do everything at once.',
    points: [
      ['An easier morning', 'Keep ingredients for a familiar breakfast at home. Yoghurt with oats and fruit, eggs on toast, or a breakfast you already enjoy are all possible options.'],
      ['Hydration without hype', 'Drink regularly and keep water nearby. Needs vary with heat, activity, and health. Follow any individual fluid advice from your clinician.'],
      ['Room to rest', 'Set wedding tasks aside for a short, quiet pause. Rest does not need to be earned with food choices or exercise.'],
      ['A kinder perspective', 'A different kind of day does not require compensation. Return to your usual routine with your next meal.'],
    ],
  },
  {
    title: 'A cared-for wedding day',
    intro: 'A little preparation can leave more room for the moments you want to remember.',
    points: [
      ['Before the day', 'Confirm allergies or medical dietary requirements with your caterer. Plan a familiar breakfast and suitable snacks.'],
      ['While getting ready', 'Ask someone you trust to keep food and water accessible. Give yourself a chance to eat between appointments.'],
      ['During the celebration', 'Enjoy your meal, your company, and your celebration. You do not need to earn wedding food by skipping earlier meals.'],
      ['The morning after', 'Come back to regular food, fluids, and rest. There is no need for a post-wedding cleanse or a compensatory diet.'],
    ],
  },
  {
    title: 'Carry the kindness forward',
    intro: 'The best part of a supportive routine is that it can grow with you, long after the flowers and celebrations.',
    points: [
      ['Keep one good thing', 'Choose a meal, a shopping habit, or a restful ritual that helped. Let it fit the life you have now.'],
      ['Make your own easy-meal list', 'Write down three meals you enjoy and can make without much effort. Include a low-cook or no-cook option.'],
      ['Ask for the right support', 'If you have a medical condition, pregnancy-related needs, persistent symptoms, or concerns about eating, seek individual advice from a qualified healthcare professional.'],
      ['A gentle reminder', 'This guide offers general education for adults. It is not a personalised meal plan or medical treatment, and does not promise weight loss, clearer skin, or any other outcome.'],
    ],
  },
];