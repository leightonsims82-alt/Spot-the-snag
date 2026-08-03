export const quizCategories = [
  {
    id: 'nhqc',
    label: 'NHQC',
    title: 'New Homes Quality Code',
    description: 'Reservations, inspections, after-sales and complaints.'
  },
  {
    id: 'nhbc',
    label: 'NHBC',
    title: 'NHBC Standards & Buildmark',
    description: 'Technical requirements, builder duties and warranty cover.'
  },
  {
    id: 'building-regulations',
    label: 'Wales',
    title: 'Welsh Building Regulations',
    description: 'Which Approved Documents cover common new-home issues.'
  },
  {
    id: 'housebuilders',
    label: 'Builders',
    title: 'Housebuilders & Consumer Protection',
    description: 'Developer registration, responsibilities and homeowner rights.'
  }
];

export const quizQuestions = [
  {
    id: 'nhqc-cooling-off',
    category: 'nhqc',
    question: 'Under the New Homes Quality Code, what is the minimum cooling-off period in a Reservation Agreement?',
    options: ['7 days', '10 days', '14 days', '28 days'],
    correctIndex: 2,
    explanation: 'The Reservation Agreement must include a cooling-off period of at least 14 days. During that period, the customer can cancel for any reason and receive the full reservation fee back.',
    sourceName: 'NHQC V2, Part 2.3',
    sourceUrl: 'https://www.nhqb.org.uk/the-code/part-2-legal-documents-information-inspection-completion/'
  },
  {
    id: 'nhqc-after-sales',
    category: 'nhqc',
    question: 'For how long must a registered developer provide a full and accessible after-sales service following completion?',
    options: ['6 months', '12 months', 'At least 2 years', '10 years'],
    correctIndex: 2,
    explanation: 'The Code requires a full and accessible after-sales service for at least two years following completion.',
    sourceName: 'NHQC V2, Part 3.1',
    sourceUrl: 'https://www.nhqb.org.uk/the-code/part-3-after-sales-service-complaints-and-the-new-homes-ombudsman/'
  },
  {
    id: 'nhqc-acknowledgement',
    category: 'nhqc',
    question: 'By when must a developer send written acknowledgement of a formal complaint under the NHQC procedure?',
    options: ['Within 2 hours', 'No later than 5 days from the complaint start date', 'Within 14 days', 'Only when an investigation is complete'],
    correctIndex: 1,
    explanation: 'A written acknowledgement must be sent no later than five days from the first business day after the complaint is received, which the Code defines as the complaint start date.',
    sourceName: 'NHQC V2, Part 3.4',
    sourceUrl: 'https://www.nhqb.org.uk/the-code/part-3-after-sales-service-complaints-and-the-new-homes-ombudsman/'
  },
  {
    id: 'nhqc-path-resolution',
    category: 'nhqc',
    question: 'When is the NHQC Path to Resolution Letter due?',
    options: ['No later than 10 days from the complaint start date', 'After 30 days', 'After 56 days', 'Only if the customer asks for it'],
    correctIndex: 0,
    explanation: 'The Path to Resolution Letter must be sent no later than 10 days from the complaint start date and explain how the complaint will be investigated.',
    sourceName: 'NHQC V2, Part 3.4',
    sourceUrl: 'https://www.nhqb.org.uk/the-code/part-3-after-sales-service-complaints-and-the-new-homes-ombudsman/'
  },
  {
    id: 'nhqc-eight-week',
    category: 'nhqc',
    question: 'If an NHQC complaint remains open, by when must the developer issue the Eight-Week Letter?',
    options: ['28 days', '30 days', '42 days', '56 days'],
    correctIndex: 3,
    explanation: 'If the complaint is not closed, the developer must issue an Eight-Week Letter no later than 56 days from the complaint start date.',
    sourceName: 'NHQC V2, Part 3.4',
    sourceUrl: 'https://www.nhqb.org.uk/the-code/part-3-after-sales-service-complaints-and-the-new-homes-ombudsman/'
  },

  {
    id: 'nhbc-2026-start',
    category: 'nhbc',
    question: 'NHBC Standards 2026 generally apply to NHBC-registered homes whose foundations are begun on or after which date?',
    options: ['1 January 2025', '1 January 2026', '2 March 2026', '1 July 2026'],
    correctIndex: 1,
    explanation: 'NHBC states that the 2026 Standards apply to registered homes whose foundations are begun on or after 1 January 2026, unless otherwise stated.',
    sourceName: 'NHBC Standards 2026',
    sourceUrl: 'https://www.nhbc.co.uk/nhbcstandards'
  },
  {
    id: 'nhbc-r1',
    category: 'nhbc',
    question: 'What does NHBC Technical Requirement R1 principally require?',
    options: ['The home must have solar panels', 'Work must comply with relevant Building Regulations and statutory requirements', 'Every defect must be cosmetic', 'The builder must provide a 20-year warranty'],
    correctIndex: 1,
    explanation: 'R1 is the statutory requirements provision. It requires work to comply with relevant Building Regulations and other statutory requirements relating to the completed construction work.',
    sourceName: 'NHBC Technical Requirements, R1',
    sourceUrl: 'https://www.nhbc.co.uk/homeowners/standards-technical-requirements'
  },
  {
    id: 'nhbc-design-life',
    category: 'nhbc',
    question: 'Unless specifically agreed otherwise with NHBC, what minimum life should the structure of a home be designed to have?',
    options: ['10 years', '25 years', '40 years', 'At least 60 years'],
    correctIndex: 3,
    explanation: 'NHBC Technical Requirement R2 states that the structure should have a life of at least 60 years unless specifically agreed otherwise in writing with NHBC.',
    sourceName: 'NHBC Technical Requirements, R2',
    sourceUrl: 'https://www.nhbc.co.uk/homeowners/standards-technical-requirements'
  },
  {
    id: 'nhbc-first-two-years',
    category: 'nhbc',
    question: 'During the usual first two years of an NHBC Buildmark policy, who is primarily responsible for rectifying problems caused by failure to meet NHBC requirements?',
    options: ['The local authority', 'The homeowner', 'The builder', 'The estate agent'],
    correctIndex: 2,
    explanation: 'During the builder warranty period, usually the first two years, the builder is responsible for rectifying qualifying problems. NHBC may assist through its resolution service if the builder fails to meet its obligations.',
    sourceName: 'NHBC Buildmark, First Two Years',
    sourceUrl: 'https://www.nhbc.co.uk/homeowners/buildmark-cover/first-two-years'
  },
  {
    id: 'nhbc-years-three-ten',
    category: 'nhbc',
    question: 'Which statement best describes NHBC Buildmark cover in years 3 to 10?',
    options: ['Every cosmetic snag is automatically covered', 'It is insurance cover for damage caused by defects in specific parts of the home, subject to the policy', 'The builder must replace all appliances', 'There is no cover after year 2'],
    correctIndex: 1,
    explanation: 'After the builder warranty period, Buildmark generally provides insurance cover for damage caused by defects in specified parts of the home, subject to the policy terms, exclusions and minimum claim value.',
    sourceName: 'NHBC Buildmark, Years 3 to 10',
    sourceUrl: 'https://www.nhbc.co.uk/homeowners/buildmark-cover/after-3-years'
  },

  {
    id: 'regs-k',
    category: 'building-regulations',
    question: 'Which Welsh Approved Document covers protection from falling, collision and impact?',
    options: ['Approved Document F', 'Approved Document K', 'Approved Document M', 'Approved Document P'],
    correctIndex: 1,
    explanation: 'Approved Document K gives guidance on protection from falling, collision and impact, including matters such as stairs and guarding.',
    sourceName: 'Welsh Approved Document K',
    sourceUrl: 'https://www.gov.wales/approved-document-k-protection-falling-collision-and-impact'
  },
  {
    id: 'regs-m',
    category: 'building-regulations',
    question: 'Which Welsh Approved Document deals with access to and use of buildings?',
    options: ['Approved Document A', 'Approved Document H', 'Approved Document M', 'Approved Document Q'],
    correctIndex: 2,
    explanation: 'Approved Document M provides guidance relating to access to and use of buildings.',
    sourceName: 'Welsh Approved Document M',
    sourceUrl: 'https://www.gov.wales/building-regulations-approved-documents'
  },
  {
    id: 'regs-f',
    category: 'building-regulations',
    question: 'Which Welsh Approved Document deals with ventilation?',
    options: ['Approved Document C', 'Approved Document F', 'Approved Document L', 'Approved Document N'],
    correctIndex: 1,
    explanation: 'Approved Document F supports the Building Regulations requirements relating to ventilation.',
    sourceName: 'Welsh Approved Document F',
    sourceUrl: 'https://www.gov.wales/approved-document-f-ventilation'
  },
  {
    id: 'regs-h',
    category: 'building-regulations',
    question: 'Which Welsh Approved Document covers drainage and waste disposal?',
    options: ['Approved Document G', 'Approved Document H', 'Approved Document J', 'Approved Document R'],
    correctIndex: 1,
    explanation: 'Approved Document H covers drainage and waste disposal.',
    sourceName: 'Welsh Approved Documents Collection',
    sourceUrl: 'https://www.gov.wales/building-regulations-approved-documents'
  },
  {
    id: 'regs-seven',
    category: 'building-regulations',
    question: 'What is the main subject of Welsh Approved Document 7?',
    options: ['Security of dwellings', 'Materials and workmanship', 'Overheating', 'Electrical safety'],
    correctIndex: 1,
    explanation: 'Approved Document 7 supports Regulation 7 and provides guidance on suitable materials and appropriate standards of workmanship.',
    sourceName: 'Welsh Approved Document 7',
    sourceUrl: 'https://www.gov.wales/approved-document-7-support-regulation-7-materials-and-workmanship'
  },

  {
    id: 'builders-active-register',
    category: 'housebuilders',
    question: 'When is a buyer generally protected by the NHQC and able to use the New Homes Ombudsman Service?',
    options: ['Whenever any developer sells a new home', 'When the developer is active on the NHQB register and the home was reserved on or after its registration start date', 'Only when the home has an NHBC warranty', 'Only after the first two years'],
    correctIndex: 1,
    explanation: 'Protection generally depends on the developer having active status and the reservation being made on or after the developer’s registration start date.',
    sourceName: 'NHQB Register of Developers',
    sourceUrl: 'https://www.nhqb.org.uk/register-of-developers/'
  },
  {
    id: 'builders-pending',
    category: 'housebuilders',
    question: 'What does “Pending” mean on the NHQB Register of Developers?',
    options: ['The developer is fully active and all customers are protected', 'The developer is working toward compliance, but customers are not yet protected by the Code', 'The developer has ceased trading', 'The developer has won an Ombudsman case'],
    correctIndex: 1,
    explanation: 'Pending means the developer is working towards Code compliance. Customers are not yet protected by the Code and cannot use the New Homes Ombudsman Service on that basis.',
    sourceName: 'NHQB Register of Developers',
    sourceUrl: 'https://www.nhqb.org.uk/register-of-developers/'
  },
  {
    id: 'builders-third-party-aftersales',
    category: 'housebuilders',
    question: 'A developer appoints another company to run its after-sales service. Who remains responsible for the complaints procedure and compliance with the NHQC?',
    options: ['The homeowner', 'The third-party contractor only', 'The developer', 'The warranty provider only'],
    correctIndex: 2,
    explanation: 'The Code states that the developer remains responsible even where a third party provides the after-sales service.',
    sourceName: 'NHQC V2, Part 3',
    sourceUrl: 'https://www.nhqb.org.uk/the-code/part-3-after-sales-service-complaints-and-the-new-homes-ombudsman/'
  },
  {
    id: 'builders-buildmark-split',
    category: 'housebuilders',
    question: 'How is a typical 10-year NHBC Buildmark policy broadly split after completion?',
    options: ['Five years builder warranty and five years insurance', 'Two years builder warranty followed by eight years of insurance cover', 'Ten years of full cosmetic snag cover', 'One year builder warranty followed by nine years with no cover'],
    correctIndex: 1,
    explanation: 'Buildmark is broadly split into a two-year builder warranty period backed by NHBC, followed by eight years of insurance cover for qualifying damage under the policy.',
    sourceName: 'NHBC Buildmark Overview',
    sourceUrl: 'https://www.nhbc.co.uk/homeowners'
  },
  {
    id: 'builders-legal-rights',
    category: 'housebuilders',
    question: 'Does the New Homes Quality Code replace a homeowner’s other legal rights?',
    options: ['Yes, completely', 'Only during the first year', 'No, it does not replace legislation or other legal rights', 'Only if the developer is NHBC registered'],
    correctIndex: 2,
    explanation: 'The Code expressly states that it does not replace applicable legislation or remove other legal rights available to the customer.',
    sourceName: 'NHQC V2, Part 4',
    sourceUrl: 'https://www.nhqb.org.uk/the-code/solvency-legal-rights-and-jurisdiction/'
  }
];
