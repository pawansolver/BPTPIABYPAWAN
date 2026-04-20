import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest, { params }: { params: { stateId: string } }) {
  const stateId = params.stateId;
  
  // Mock districts data based on state
  const districtsByState: { [key: string]: Array<{ id: number; name: string }> } = {
    '1': [ // Andhra Pradesh
      { id: 1, name: 'Anantapur' },
      { id: 2, name: 'Chittoor' },
      { id: 3, name: 'East Godavari' },
      { id: 4, name: 'Guntur' },
      { id: 5, name: 'Krishna' },
      { id: 6, name: 'Kurnool' },
      { id: 7, name: 'Nellore' },
      { id: 8, name: 'Prakasam' },
      { id: 9, name: 'Srikakulam' },
      { id: 10, name: 'Visakhapatnam' },
      { id: 11, name: 'Vizianagaram' },
      { id: 12, name: 'West Godavari' },
      { id: 13, name: 'YSR Kadapa' }
    ],
    '26': [ // Uttar Pradesh
      { id: 101, name: 'Agra' },
      { id: 102, name: 'Aligarh' },
      { id: 103, name: 'Allahabad' },
      { id: 104, name: 'Ambedkar Nagar' },
      { id: 105, name: 'Auraiya' },
      { id: 106, name: 'Azamgarh' },
      { id: 107, name: 'Barabanki' },
      { id: 108, name: 'Bareilly' },
      { id: 109, name: 'Basti' },
      { id: 110, name: 'Budaun' },
      { id: 111, name: 'Bulandshahr' },
      { id: 112, name: 'Chandauli' },
      { id: 113, name: 'Chitrakoot' },
      { id: 114, name: 'Deoria' },
      { id: 115, name: 'Etah' },
      { id: 116, name: 'Etawah' },
      { id: 117, name: 'Farrukhabad' },
      { id: 118, name: 'Fatehpur' },
      { id: 119, name: 'Firozabad' },
      { id: 120, name: 'Gautam Buddha Nagar' },
      { id: 121, name: 'Ghaziabad' },
      { id: 122, name: 'Ghazipur' },
      { id: 123, name: 'Gonda' },
      { id: 124, name: 'Gorakhpur' },
      { id: 125, name: 'Hamirpur' },
      { id: 126, name: 'Hapur' },
      { id: 127, name: 'Hardoi' },
      { id: 128, name: 'Hathras' },
      { id: 129, name: 'Jalaun' },
      { id: 130, name: 'Jaunpur' },
      { id: 131, name: 'Jhansi' },
      { id: 132, name: 'Kannauj' },
      { id: 133, name: 'Kanpur Dehat' },
      { id: 134, name: 'Kanpur Nagar' },
      { id: 135, name: 'Kasganj' },
      { id: 136, name: 'Kaushambi' },
      { id: 137, name: 'Kushinagar' },
      { id: 138, name: 'Lakhimpur Kheri' },
      { id: 139, name: 'Lalitpur' },
      { id: 140, name: 'Lucknow' },
      { id: 141, name: 'Maharajganj' },
      { id: 142, name: 'Mahoba' },
      { id: 143, name: 'Mainpuri' },
      { id: 144, name: 'Mathura' },
      { id: 145, name: 'Mau' },
      { id: 146, name: 'Meerut' },
      { id: 147, name: 'Mirzapur' },
      { id: 148, name: 'Moradabad' },
      { id: 149, name: 'Muzaffarnagar' },
      { id: 150, name: 'Pilibhit' },
      { id: 151, name: 'Pratapgarh' },
      { id: 152, name: 'Rae Bareli' },
      { id: 153, name: 'Rampur' },
      { id: 154, name: 'Saharanpur' },
      { id: 155, name: 'Sambhal' },
      { id: 156, name: 'Shahjahanpur' },
      { id: 157, name: 'Shravasti' },
      { id: 158, name: 'Siddharthnagar' },
      { id: 159, name: 'Sitapur' },
      { id: 160, name: 'Sonbhadra' },
      { id: 161, name: 'Sultanpur' },
      { id: 162, name: 'Unnao' },
      { id: 163, name: 'Varanasi' }
    ]
  };

  const districts = districtsByState[stateId] || [
    { id: 999, name: 'Default District' }
  ];

  return NextResponse.json({
    success: true,
    data: districts
  });
}
