export const quizCategories = [
  {
    id: 'nhqc',
    label: 'Finishes',
    title: 'Finishes & Tolerances',
    description: 'NHBC expectations for walls, ceilings, paintwork and handover finishes.'
  },
  {
    id: 'nhbc',
    label: 'Timber',
    title: 'Timber Frame & Movement',
    description: 'Differential movement, window cills and masonry-clad timber frame details.'
  },
  {
    id: 'building-regulations',
    label: 'Openings',
    title: 'Windows & Weatherproofing',
    description: 'Frame gaps, sealants, trims, movement and weather-tight installation.'
  },
  {
    id: 'housebuilders',
    label: 'Defects',
    title: 'Defect Consequences',
    description: 'What defects can cause and how finishes should be assessed at handover.'
  }
];

export const quizQuestions = [
  {
    id: 'finish-plaster-viewing',
    category: 'nhqc',
    question: 'How should plastered and dry-lined surfaces normally be assessed for visible finish defects?',
    options: [
      'From 0.5m using a bright handheld torch',
      'From 2m in natural daylight with no artificial light shining on the surface',
      'From any distance using an uplighter',
      'Only after the room has been decorated twice'
    ],
    correctIndex: 1,
    explanation: 'Correct answer: From 2m in natural daylight with no artificial light shining on the surface. Plastered and dry-lined surfaces should be viewed with wall lights and uplighters switched off and no artificial light directed onto the surface.',
    sourceName: 'Reference: NHBC Standards 2026, Chapter 9.1.3.1, Plastered and dry-lined surfaces',
    sourceUrl: 'https://www.nhbc.co.uk/nhbcstandards'
  },
  {
    id: 'finish-board-joints',
    category: 'nhqc',
    question: 'What is the maximum permitted deviation at plasterboard joints when checked with a 450mm straightedge with equal offsets?',
    options: ['±1mm', '±3mm', '±5mm', '±10mm'],
    correctIndex: 1,
    explanation: 'Correct answer: ±3mm. Plastered and dry-lined board joints should not be readily visible and should remain within this maximum deviation when checked with a 450mm straightedge with equal offsets.',
    sourceName: 'Reference: NHBC Standards 2026, Chapter 9.1.3.1, Plastered and dry-lined surfaces',
    sourceUrl: 'https://www.nhbc.co.uk/nhbcstandards'
  },
  {
    id: 'finish-wall-flatness',
    category: 'nhqc',
    question: 'What flatness tolerance applies to an internal wall finish when measured with a 2m straightedge?',
    options: ['±2mm', '±3mm', '±8mm', '±12mm'],
    correctIndex: 1,
    explanation: 'Correct answer: ±3mm. Internal wall finishes should be within this maximum deviation from a 2m straightedge with equal offsets, measured in all directions.',
    sourceName: 'Reference: NHBC Standards 2026, Chapter 9.1.3.2, Walls',
    sourceUrl: 'https://www.nhbc.co.uk/nhbcstandards'
  },
  {
    id: 'finish-wall-plumb',
    category: 'nhqc',
    question: 'For an internal wall up to 3m high, what is the maximum permitted deviation from plumb under NHBC Chapter 9.1?',
    options: ['3mm', '5mm', '8mm', '15mm'],
    correctIndex: 2,
    explanation: 'Correct answer: 8mm. An internal wall finish up to 3m high should be no more than 8mm out of plumb. Taller continuous walls are limited to 8mm per storey and 12mm overall.',
    sourceName: 'Reference: NHBC Standards 2026, Chapter 9.1.3.2, Walls',
    sourceUrl: 'https://www.nhbc.co.uk/nhbcstandards'
  },
  {
    id: 'finish-ceiling-flatness',
    category: 'nhqc',
    question: 'What is the maximum flatness deviation for a ceiling checked with a 2m straightedge with equal offsets?',
    options: ['±2mm', '±3mm', '±5mm', '±12mm'],
    correctIndex: 2,
    explanation: 'Correct answer: ±5mm. This is the maximum ceiling flatness deviation when measured using a 2m straightedge with equal offsets.',
    sourceName: 'Reference: NHBC Standards 2026, Chapter 9.1.3.3, Ceilings',
    sourceUrl: 'https://www.nhbc.co.uk/nhbcstandards'
  },

  {
    id: 'timber-insufficient-cill-gap',
    category: 'nhbc',
    question: 'What is a likely consequence if insufficient differential-movement clearance is provided beneath a window cill on a masonry-clad timber-frame home?',
    options: [
      'The timber frame and masonry may bear against the cill or window, causing stress, distortion, cracking, binding and reduced weather tightness',
      'The window automatically becomes more secure',
      'Only the internal paint colour is affected',
      'Nothing, because timber frame and masonry move at exactly the same rate'
    ],
    correctIndex: 0,
    explanation: 'Correct answer: The timber frame and masonry may bear against the cill or window, causing stress, distortion, cracking, binding and reduced weather tightness. The timber frame can shrink while the masonry outer leaf expands, so sufficient independent movement clearance is essential.',
    sourceName: 'Reference: NHBC Standards 2026, Chapter 6.2, Table 1 and differential-movement details; LABC Warranty, Gaps around windows',
    sourceUrl: 'https://www.nhbc.co.uk/nhbcstandards'
  },
  {
    id: 'timber-first-floor-engineered',
    category: 'nhbc',
    question: 'Without project-specific calculations, what first-floor movement gap does NHBC Table 1 give for a masonry-clad timber frame using engineered I-joists?',
    options: ['5mm', '10mm', '15mm', '25mm'],
    correctIndex: 2,
    explanation: 'Correct answer: 15mm. NHBC Table 1 gives a 15mm opening or closing gap at first-floor level where engineered I-joists are used, unless project-specific calculations or details establish otherwise.',
    sourceName: 'Reference: NHBC Standards 2026, Chapter 6.2, Table 1, Differential movement',
    sourceUrl: 'https://www.nhbc.co.uk/nhbcstandards'
  },
  {
    id: 'timber-first-floor-solid',
    category: 'nhbc',
    question: 'Without project-specific calculations, what first-floor movement gap does NHBC Table 1 give where solid timber floor joists are used?',
    options: ['10mm', '15mm', '20mm', '35mm'],
    correctIndex: 2,
    explanation: 'Correct answer: 20mm. NHBC Table 1 gives a 20mm opening or closing gap at first-floor level where solid timber floor joists are used, unless project-specific calculations or details establish otherwise.',
    sourceName: 'Reference: NHBC Standards 2026, Chapter 6.2, Table 1, Differential movement',
    sourceUrl: 'https://www.nhbc.co.uk/nhbcstandards'
  },
  {
    id: 'timber-cill-detail',
    category: 'nhbc',
    question: 'Why should a window cill on a masonry-clad timber-frame wall not be rigidly built into the masonry?',
    options: [
      'To make the cill easier to paint',
      'To allow the timber frame and masonry cladding to move independently without loading the cill',
      'To increase heat loss through the opening',
      'To remove the need for a cavity tray'
    ],
    correctIndex: 1,
    explanation: 'Correct answer: To allow the timber frame and masonry cladding to move independently without loading the cill. The movement detail must avoid transferring differential movement into the cill, frame or surrounding masonry.',
    sourceName: 'Reference: NHBC Standards 2026, Chapter 6.2, Differential-movement details at openings',
    sourceUrl: 'https://www.nhbc.co.uk/nhbcstandards'
  },
  {
    id: 'timber-brick-expansion',
    category: 'nhbc',
    question: 'What clay brickwork expansion rate per storey is used as a basis for NHBC timber-frame differential-movement details?',
    options: ['0.5mm', '1mm', '2.5mm', '10mm'],
    correctIndex: 2,
    explanation: 'Correct answer: 2.5mm per storey. The standard movement details are based on outer-leaf clay brickwork expansion not exceeding this figure, together with the stated timber-frame assumptions.',
    sourceName: 'Reference: NHBC Standards 2026, Chapter 6.2, Table 1 notes',
    sourceUrl: 'https://www.nhbc.co.uk/nhbcstandards'
  },

  {
    id: 'window-gap-too-small',
    category: 'building-regulations',
    question: 'What is a likely consequence of a perimeter gap around a window being too small?',
    options: [
      'Stress can build in the frame, causing buckling, bending, binding locks, cracked joints or glazing damage',
      'The frame becomes permanently maintenance-free',
      'The cavity becomes wider',
      'The glass automatically becomes tougher'
    ],
    correctIndex: 0,
    explanation: 'Correct answer: Stress can build in the frame, causing buckling, bending, binding locks, cracked joints or glazing damage. Insufficient space can prevent the frame from accommodating thermal movement.',
    sourceName: 'Reference: LABC Warranty, Gaps around windows, sealants and finishing trims',
    sourceUrl: 'https://www.labcwarranty.co.uk/technical-blog/gaps-around-windows-sealants-and-finishing-trims'
  },
  {
    id: 'window-gap-too-large',
    category: 'building-regulations',
    question: 'What can an excessively large perimeter gap around a window compromise?',
    options: [
      'Only the colour of the frame',
      'Weather tightness, air tightness, thermal performance and resistance to thermal bridging',
      'The size of the room',
      'The water pressure in the property'
    ],
    correctIndex: 1,
    explanation: 'Correct answer: Weather tightness, air tightness, thermal performance and resistance to thermal bridging. Oversized gaps may also require unsuitable sealant depths or inappropriate finishing trims.',
    sourceName: 'Reference: Premier Guarantee, Gaps around windows, sealants and finishing trims',
    sourceUrl: 'https://www.premierguarantee.com/en/insite/Technical/gaps-around-windows-sealants-and-finishing-trims.html'
  },
  {
    id: 'window-max-gap-under-three',
    category: 'building-regulations',
    question: 'According to LABC Warranty and Premier Guarantee guidance, what maximum perimeter gap should apply to a window opening less than 3m, subject to the manufacturer’s instructions?',
    options: ['5mm', '10mm', '15mm', '25mm'],
    correctIndex: 1,
    explanation: 'Correct answer: 10mm. This is the published warranty-provider guidance for an opening below 3m, subject to the relevant window manufacturer’s requirements and the project specification.',
    sourceName: 'Reference: LABC Warranty and Premier Guarantee, Perimeter gap dimensions',
    sourceUrl: 'https://www.labcwarranty.co.uk/technical-blog/gaps-around-windows-sealants-and-finishing-trims'
  },
  {
    id: 'window-backing-strip',
    category: 'building-regulations',
    question: 'What should be provided behind sealant where a perimeter gap around a window is greater than 5mm?',
    options: [
      'Loose mortar only',
      'A suitable backing strip, with the sealant having a minimum depth of 6mm',
      'A decorative plastic trim only',
      'Nothing, the sealant should be left unsupported'
    ],
    correctIndex: 1,
    explanation: 'Correct answer: A suitable backing strip, with the sealant having a minimum depth of 6mm. The backing supports the sealant and helps it form an appropriate joint profile.',
    sourceName: 'Reference: Premier Guarantee, Perimeter gap dimensions',
    sourceUrl: 'https://www.premierguarantee.com/en/insite/Technical/gaps-around-windows-sealants-and-finishing-trims.html'
  },
  {
    id: 'window-finishing-trims',
    category: 'building-regulations',
    question: 'Can surface-fixed finishing trims be used simply to disguise a window that is undersized for its structural opening?',
    options: [
      'Yes, in every case',
      'Only if the homeowner cannot see the gap',
      'No, trims should not be used to extend an undersized frame unless they are recognised parts of the designed window system',
      'Yes, provided extra silicone is applied'
    ],
    correctIndex: 2,
    explanation: 'Correct answer: No, trims should not be used to extend an undersized frame unless they are recognised parts of the designed window system. A finishing trim is not a substitute for a correctly sized and installed window.',
    sourceName: 'Reference: LABC Warranty, Finishing trims',
    sourceUrl: 'https://www.labcwarranty.co.uk/technical-blog/gaps-around-windows-sealants-and-finishing-trims'
  },

  {
    id: 'defect-skirting-gap',
    category: 'housebuilders',
    question: 'At completion, what is the maximum gap between the unfinished floor surface and the bottom of a skirting board?',
    options: ['2mm', '5mm', '8mm', '12mm'],
    correctIndex: 1,
    explanation: 'Correct answer: 5mm. The gap between the unfinished floor surface and the bottom of the skirting should not exceed this figure at completion.',
    sourceName: 'Reference: NHBC Standards 2026, Chapter 9.1.3.4, Skirtings',
    sourceUrl: 'https://www.nhbc.co.uk/nhbcstandards'
  },
  {
    id: 'defect-junction-crack',
    category: 'housebuilders',
    question: 'What width of cracking may occur at wall, floor and ceiling junctions due to normal shrinkage and differential movement?',
    options: ['Up to 0.2mm', 'Up to 2mm', 'Up to 8mm', 'Any width is acceptable'],
    correctIndex: 1,
    explanation: 'Correct answer: Up to 2mm. Some cracking of this width may occur at junctions because different materials shrink and move at different rates. Progressive, recurring, displaced or otherwise concerning cracking still requires investigation.',
    sourceName: 'Reference: NHBC Standards 2026, Chapter 9.1.3.3, Junction cracking',
    sourceUrl: 'https://www.nhbc.co.uk/nhbcstandards'
  },
  {
    id: 'defect-sealant-finish',
    category: 'housebuilders',
    question: 'Which description best matches an acceptable finished sealant joint?',
    options: [
      'Rough, blistered and over-smeared onto adjacent finishes',
      'Compact, smooth, neat and tooled to remove blisters and irregularities',
      'Left untooled so it can move freely',
      'Covered by paint regardless of its condition'
    ],
    correctIndex: 1,
    explanation: 'Correct answer: Compact, smooth, neat and tooled to remove blisters and irregularities. Finished sealant should have a neat and tidy appearance and an appropriate compact joint profile.',
    sourceName: 'Reference: NHBC Standards 2026, Chapter 9.1.9, Joint sealants',
    sourceUrl: 'https://www.nhbc.co.uk/nhbcstandards'
  },
  {
    id: 'defect-paint-inspection',
    category: 'housebuilders',
    question: 'How should painted and varnished surfaces normally be viewed when deciding whether runs or prominent brush marks are conspicuous?',
    options: [
      'From 2m in daylight, without artificial light being shone onto the surface',
      'From 50mm using a high-powered torch',
      'Only at night with all wall lights switched on',
      'From outside the room through the doorway'
    ],
    correctIndex: 0,
    explanation: 'Correct answer: From 2m in daylight, without artificial light being shone onto the surface. Wall lights and uplighters should be switched off for the normal assessment.',
    sourceName: 'Reference: NHBC Standards 2026, Chapter 9.1.10, Painting and decorating',
    sourceUrl: 'https://www.nhbc.co.uk/nhbcstandards'
  },
  {
    id: 'defect-sanitary-viewing',
    category: 'housebuilders',
    question: 'From what distance should baths, shower trays and basins normally be checked in daylight for conspicuous scratches, chips or abrasions?',
    options: ['0.5m', '1m', '2m', '5m'],
    correctIndex: 0,
    explanation: 'Correct answer: 0.5m. Sanitary fittings should not have conspicuous scratches, chips or abrasions when viewed in daylight from this distance.',
    sourceName: 'Reference: NHBC Standards 2026, Chapter 9.1.11, Sanitary fittings',
    sourceUrl: 'https://www.nhbc.co.uk/nhbcstandards'
  }
];
