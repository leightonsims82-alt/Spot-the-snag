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
    explanation: 'NHBC Chapter 9.1 states that plastered and dry-lined surfaces should be viewed from 2m in natural daylight, with wall lights and uplighters switched off and no artificial light directed onto the surface.',
    sourceName: 'NHBC Standards 2026, Chapter 9.1.3.1',
    sourceUrl: 'https://www.nhbc.co.uk/nhbcstandards'
  },
  {
    id: 'finish-board-joints',
    category: 'nhqc',
    question: 'What is the maximum permitted deviation at plasterboard joints when checked with a 450mm straightedge with equal offsets?',
    options: ['±1mm', '±3mm', '±5mm', '±10mm'],
    correctIndex: 1,
    explanation: 'Plastered and dry-lined board joints should not be readily visible and should be within a maximum deviation of ±3mm when checked with a 450mm straightedge with equal offsets.',
    sourceName: 'NHBC Standards 2026, Chapter 9.1.3.1',
    sourceUrl: 'https://www.nhbc.co.uk/nhbcstandards'
  },
  {
    id: 'finish-wall-flatness',
    category: 'nhqc',
    question: 'What flatness tolerance applies to an internal wall finish when measured with a 2m straightedge?',
    options: ['±2mm', '±3mm', '±8mm', '±12mm'],
    correctIndex: 1,
    explanation: 'Internal wall finishes should be within a maximum deviation of ±3mm from a 2m straightedge with equal offsets, measured in all directions.',
    sourceName: 'NHBC Standards 2026, Chapter 9.1.3.2',
    sourceUrl: 'https://www.nhbc.co.uk/nhbcstandards'
  },
  {
    id: 'finish-wall-plumb',
    category: 'nhqc',
    question: 'For an internal wall up to 3m high, what is the maximum permitted deviation from plumb under NHBC Chapter 9.1?',
    options: ['3mm', '5mm', '8mm', '15mm'],
    correctIndex: 2,
    explanation: 'An internal wall finish up to 3m high should be no more than 8mm out of plumb. Taller continuous walls are limited to 8mm per storey and 12mm overall.',
    sourceName: 'NHBC Standards 2026, Chapter 9.1.3.2',
    sourceUrl: 'https://www.nhbc.co.uk/nhbcstandards'
  },
  {
    id: 'finish-ceiling-flatness',
    category: 'nhqc',
    question: 'What is the maximum flatness deviation for a ceiling checked with a 2m straightedge with equal offsets?',
    options: ['±2mm', '±3mm', '±5mm', '±12mm'],
    correctIndex: 2,
    explanation: 'NHBC Chapter 9.1 gives a maximum ceiling flatness deviation of ±5mm when measured with a 2m straightedge with equal offsets.',
    sourceName: 'NHBC Standards 2026, Chapter 9.1.3.3',
    sourceUrl: 'https://www.nhbc.co.uk/nhbcstandards'
  },

  {
    id: 'timber-insufficient-cill-gap',
    category: 'nhbc',
    question: 'What can happen if insufficient differential movement clearance is left beneath a window cill on a masonry-clad timber-frame home?',
    options: [
      'The timber frame and masonry can bear against the cill or window, causing stress, distortion, cracking and possible loss of operation or weather tightness',
      'The window automatically becomes more secure',
      'Only the internal paint colour is affected',
      'Nothing, because timber frame and masonry move at exactly the same rate'
    ],
    correctIndex: 0,
    explanation: 'The timber frame can shrink down while the masonry outer leaf expands. Without sufficient clearance, movement can be transferred into the cill, frame or surrounding masonry, causing distortion, cracking, binding and potentially compromised seals or weather resistance.',
    sourceName: 'NHBC Standards 2026, Chapter 6.2 and LABC Warranty window guidance',
    sourceUrl: 'https://www.labcwarranty.co.uk/technical-blog/gaps-around-windows-sealants-and-finishing-trims'
  },
  {
    id: 'timber-first-floor-engineered',
    category: 'nhbc',
    question: 'Without project-specific calculations, what first-floor movement gap does NHBC Table 1 give for a masonry-clad timber frame using engineered I-joists?',
    options: ['5mm', '10mm', '15mm', '25mm'],
    correctIndex: 2,
    explanation: 'NHBC Chapter 6.2 Table 1 gives a 15mm opening or closing gap at first-floor level where engineered I-joists are used.',
    sourceName: 'NHBC Standards 2026, Chapter 6.2 Table 1',
    sourceUrl: 'https://www.nhbc.co.uk/nhbcstandards'
  },
  {
    id: 'timber-first-floor-solid',
    category: 'nhbc',
    question: 'Without project-specific calculations, what first-floor movement gap does NHBC Table 1 give where solid timber floor joists are used?',
    options: ['10mm', '15mm', '20mm', '35mm'],
    correctIndex: 2,
    explanation: 'NHBC Chapter 6.2 Table 1 gives a 20mm opening or closing gap at first-floor level where solid timber floor joists are used.',
    sourceName: 'NHBC Standards 2026, Chapter 6.2 Table 1',
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
    explanation: 'NHBC movement details show the cill not built into the masonry and include clearance so the timber frame can move relative to the outer leaf without transferring damaging loads.',
    sourceName: 'NHBC Standards 2026, Chapter 6.2 Figures 10 and 11',
    sourceUrl: 'https://www.nhbc.co.uk/nhbcstandards'
  },
  {
    id: 'timber-brick-expansion',
    category: 'nhbc',
    question: 'What clay brickwork expansion rate per storey is used as a basis for NHBC timber-frame differential movement details?',
    options: ['0.5mm', '1mm', '2.5mm', '10mm'],
    correctIndex: 2,
    explanation: 'The standard movement details are based on outer-leaf clay brickwork expansion not exceeding 2.5mm per storey, together with the stated timber-frame assumptions.',
    sourceName: 'NHBC Standards 2026, Chapter 6.2 Table 1 notes',
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
    explanation: 'LABC Warranty and Premier Guarantee warn that insufficient gaps can prevent thermal movement, stressing the frame and potentially causing buckling, binding hardware, cracked joints and stress transfer into the glazing.',
    sourceName: 'LABC Warranty, Gaps around windows',
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
    explanation: 'Oversized gaps can lead to excessive sealant lines or unsuitable trims, affecting weather tightness, air tightness, thermal performance and condensation risk.',
    sourceName: 'Premier Guarantee, Gaps around windows',
    sourceUrl: 'https://www.premierguarantee.com/en/insite/Technical/gaps-around-windows-sealants-and-finishing-trims.html'
  },
  {
    id: 'window-max-gap-under-three',
    category: 'building-regulations',
    question: 'According to LABC Warranty and Premier Guarantee guidance, what is the maximum permitted perimeter gap for an opening less than 3m?',
    options: ['5mm', '10mm', '15mm', '25mm'],
    correctIndex: 1,
    explanation: 'Their published guidance states that the maximum permitted gap for openings below 3m should be 10mm, subject to the window manufacturer’s requirements.',
    sourceName: 'LABC Warranty, Perimeter gap dimensions',
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
    explanation: 'Published LABC Warranty and Premier Guarantee guidance requires a backing strip behind sealant for gaps greater than 5mm, with a minimum sealant depth of 6mm.',
    sourceName: 'Premier Guarantee, Perimeter gap dimensions',
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
    explanation: 'Warranty guidance states that finishing trims are not a substitute for a correctly sized frame. Only recognised sections forming part of the tested or designed window system should extend the frame.',
    sourceName: 'LABC Warranty, Finishing trims',
    sourceUrl: 'https://www.labcwarranty.co.uk/technical-blog/gaps-around-windows-sealants-and-finishing-trims'
  },

  {
    id: 'defect-skirting-gap',
    category: 'housebuilders',
    question: 'At completion, what is the maximum gap permitted between the floor finish, without coverings, and the bottom of a skirting board?',
    options: ['2mm', '5mm', '8mm', '12mm'],
    correctIndex: 1,
    explanation: 'NHBC Chapter 9.1 states that the gap between the unfinished floor surface and the bottom of the skirting should not exceed 5mm at completion.',
    sourceName: 'NHBC Standards 2026, Chapter 9.1.3.4',
    sourceUrl: 'https://www.nhbc.co.uk/nhbcstandards'
  },
  {
    id: 'defect-junction-crack',
    category: 'housebuilders',
    question: 'What width of cracking may occur at wall, floor and ceiling junctions due to normal shrinkage and differential movement?',
    options: ['Up to 0.2mm', 'Up to 2mm', 'Up to 8mm', 'Any width is acceptable'],
    correctIndex: 1,
    explanation: 'NHBC notes that some cracking up to 2mm wide may occur at junctions because different materials shrink and move at different rates. Wider, progressive or otherwise concerning cracks still require investigation.',
    sourceName: 'NHBC Standards 2026, Chapter 9.1.3.3',
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
    explanation: 'NHBC Chapter 9.1 requires joint sealants to have a neat and tidy appearance and to be tooled to remove blisters and irregularities and achieve a compact, smooth finish.',
    sourceName: 'NHBC Standards 2026, Chapter 9.1.9',
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
    explanation: 'NHBC states that painted surfaces should be viewed in daylight from 2m, without artificial light being directed onto them. Wall lights and uplighters should be switched off.',
    sourceName: 'NHBC Standards 2026, Chapter 9.1.10',
    sourceUrl: 'https://www.nhbc.co.uk/nhbcstandards'
  },
  {
    id: 'defect-sanitary-viewing',
    category: 'housebuilders',
    question: 'From what distance should baths, shower trays and basins normally be checked in daylight for conspicuous scratches, chips or abrasions?',
    options: ['0.5m', '1m', '2m', '5m'],
    correctIndex: 0,
    explanation: 'NHBC Chapter 9.1 states that sanitary fittings should not have conspicuous damage when viewed in daylight from a distance of 0.5m.',
    sourceName: 'NHBC Standards 2026, Chapter 9.1.11',
    sourceUrl: 'https://www.nhbc.co.uk/nhbcstandards'
  }
];
