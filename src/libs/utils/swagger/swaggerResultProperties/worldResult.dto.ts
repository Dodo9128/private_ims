import { ApiProperty } from "@nestjs/swagger";
import { Expose } from "class-transformer";
import { WorldCountry } from "../../../../entities/worldCountry.entity";
import { WorldState } from "../../../../entities/worldState.entity";
import { WorldCity } from "../../../../entities/worldCity.entity";

class listWorldCountryData {
  @Expose()
  @ApiProperty({ description: "조회한 world_country 테이블 내의 총 데이터 수" })
  totalCount: number;

  @Expose()
  @ApiProperty({ description: "pageSize의 값만큼 조회한 리스트를 반환" })
  listCount: number;

  @Expose()
  @ApiProperty({
    type: WorldCountry,
    isArray: true,
    description: "listCount의 수만큼 조회된 world_country 리스트",
  })
  list: WorldCountry[];
}

export class listWorldCountrySuccessReturn {
  @Expose()
  @ApiProperty({ example: "OK" })
  result: string;

  @Expose()
  @ApiProperty({ example: "SUCCESS" })
  message: string;

  @Expose()
  @ApiProperty({
    example: {
      totalCount: 248,
      listCount: 30,
      list: [
        {
          id: 187,
          name: "Saint Pierre and Miquelon",
          iso3: "SPM",
          iso2: "PM",
          phonecode: "508",
          capital: "Saint-Pierre",
          currency: "EUR",
          natives: null,
          flag: 1,
          code: 666,
        },
        {
          id: 186,
          name: "Saint Lucia",
          iso3: "LCA",
          iso2: "LC",
          phonecode: "+1-758",
          capital: "Castries",
          currency: "XCD",
          natives: null,
          flag: 1,
          code: 662,
        },
        {
          id: 185,
          name: "Saint Kitts And Nevis",
          iso3: "KNA",
          iso2: "KN",
          phonecode: "+1-869",
          capital: "Basseterre",
          currency: "XCD",
          natives: null,
          flag: 1,
          code: 659,
        },
        {
          id: 184,
          name: "Saint Helena",
          iso3: "SHN",
          iso2: "SH",
          phonecode: "290",
          capital: "Jamestown",
          currency: "SHP",
          natives: null,
          flag: 1,
          code: 654,
        },
        {
          id: 183,
          name: "Rwanda",
          iso3: "RWA",
          iso2: "RW",
          phonecode: "250",
          capital: "Kigali",
          currency: "RWF",
          natives: null,
          flag: 1,
          code: 646,
        },
        {
          id: 182,
          name: "Russia",
          iso3: "RUS",
          iso2: "RU",
          phonecode: "7",
          capital: "Moscow",
          currency: "RUB",
          natives: null,
          flag: 1,
          code: 643,
        },
        {
          id: 181,
          name: "Romania",
          iso3: "ROU",
          iso2: "RO",
          phonecode: "40",
          capital: "Bucharest",
          currency: "RON",
          natives: null,
          flag: 1,
          code: 642,
        },
        {
          id: 180,
          name: "Reunion",
          iso3: "REU",
          iso2: "RE",
          phonecode: "262",
          capital: "Saint-Denis",
          currency: "EUR",
          natives: null,
          flag: 1,
          code: 638,
        },
        {
          id: 179,
          name: "Qatar",
          iso3: "QAT",
          iso2: "QA",
          phonecode: "974",
          capital: "Doha",
          currency: "QAR",
          natives: null,
          flag: 1,
          code: 634,
        },
        {
          id: 178,
          name: "Puerto Rico",
          iso3: "PRI",
          iso2: "PR",
          phonecode: "+1-787 and 1-939",
          capital: "San Juan",
          currency: "USD",
          natives: null,
          flag: 1,
          code: 630,
        },
        {
          id: 177,
          name: "Portugal",
          iso3: "PRT",
          iso2: "PT",
          phonecode: "351",
          capital: "Lisbon",
          currency: "EUR",
          natives: null,
          flag: 1,
          code: 620,
        },
        {
          id: 176,
          name: "Poland",
          iso3: "POL",
          iso2: "PL",
          phonecode: "48",
          capital: "Warsaw",
          currency: "PLN",
          natives: null,
          flag: 1,
          code: 616,
        },
        {
          id: 175,
          name: "Pitcairn Island",
          iso3: "PCN",
          iso2: "PN",
          phonecode: "870",
          capital: "Adamstown",
          currency: "NZD",
          natives: null,
          flag: 1,
          code: 612,
        },
        {
          id: 174,
          name: "Philippines",
          iso3: "PHL",
          iso2: "PH",
          phonecode: "63",
          capital: "Manila",
          currency: "PHP",
          natives: null,
          flag: 1,
          code: 608,
        },
        {
          id: 173,
          name: "Peru",
          iso3: "PER",
          iso2: "PE",
          phonecode: "51",
          capital: "Lima",
          currency: "PEN",
          natives: null,
          flag: 1,
          code: 604,
        },
        {
          id: 172,
          name: "Paraguay",
          iso3: "PRY",
          iso2: "PY",
          phonecode: "595",
          capital: "Asuncion",
          currency: "PYG",
          natives: null,
          flag: 1,
          code: 600,
        },
        {
          id: 171,
          name: "Papua new Guinea",
          iso3: "PNG",
          iso2: "PG",
          phonecode: "675",
          capital: "Port Moresby",
          currency: "PGK",
          natives: null,
          flag: 1,
          code: 598,
        },
        {
          id: 170,
          name: "Panama",
          iso3: "PAN",
          iso2: "PA",
          phonecode: "507",
          capital: "Panama City",
          currency: "PAB",
          natives: null,
          flag: 1,
          code: 591,
        },
        {
          id: 169,
          name: "Palestinian Territory Occupied",
          iso3: "PSE",
          iso2: "PS",
          phonecode: "970",
          capital: "East Jerusalem",
          currency: "ILS",
          natives: null,
          flag: 1,
          code: 275,
        },
        {
          id: 168,
          name: "Palau",
          iso3: "PLW",
          iso2: "PW",
          phonecode: "680",
          capital: "Melekeok",
          currency: "USD",
          natives: null,
          flag: 1,
          code: 585,
        },
        {
          id: 167,
          name: "Pakistan",
          iso3: "PAK",
          iso2: "PK",
          phonecode: "92",
          capital: "Islamabad",
          currency: "PKR",
          natives: null,
          flag: 1,
          code: 586,
        },
        {
          id: 166,
          name: "Oman",
          iso3: "OMN",
          iso2: "OM",
          phonecode: "968",
          capital: "Muscat",
          currency: "OMR",
          natives: null,
          flag: 1,
          code: 512,
        },
        {
          id: 165,
          name: "Norway",
          iso3: "NOR",
          iso2: "NO",
          phonecode: "47",
          capital: "Oslo",
          currency: "NOK",
          natives: null,
          flag: 1,
          code: 578,
        },
        {
          id: 164,
          name: "Northern Mariana Islands",
          iso3: "MNP",
          iso2: "MP",
          phonecode: "+1-670",
          capital: "Saipan",
          currency: "USD",
          natives: null,
          flag: 1,
          code: 580,
        },
        {
          id: 163,
          name: "Norfolk Island",
          iso3: "NFK",
          iso2: "NF",
          phonecode: "672",
          capital: "Kingston",
          currency: "AUD",
          natives: null,
          flag: 1,
          code: 574,
        },
        {
          id: 162,
          name: "Niue",
          iso3: "NIU",
          iso2: "NU",
          phonecode: "683",
          capital: "Alofi",
          currency: "NZD",
          natives: null,
          flag: 1,
          code: 570,
        },
        {
          id: 161,
          name: "Nigeria",
          iso3: "NGA",
          iso2: "NG",
          phonecode: "234",
          capital: "Abuja",
          currency: "NGN",
          natives: null,
          flag: 1,
          code: 566,
        },
        {
          id: 160,
          name: "Niger",
          iso3: "NER",
          iso2: "NE",
          phonecode: "227",
          capital: "Niamey",
          currency: "XOF",
          natives: null,
          flag: 1,
          code: 562,
        },
        {
          id: 159,
          name: "Nicaragua",
          iso3: "NIC",
          iso2: "NI",
          phonecode: "505",
          capital: "Managua",
          currency: "NIO",
          natives: null,
          flag: 1,
          code: 558,
        },
        {
          id: 158,
          name: "New Zealand",
          iso3: "NZL",
          iso2: "NZ",
          phonecode: "64",
          capital: "Wellington",
          currency: "NZD",
          natives: null,
          flag: 1,
          code: 554,
        },
      ],
    },
  })
  data: listWorldCountryData;
}

class listWorldStateData {
  @Expose()
  @ApiProperty({ description: "조회한 world_state 테이블 내의 총 데이터 수" })
  totalCount: number;

  @Expose()
  @ApiProperty({ description: "pageSize의 값만큼 조회한 리스트를 반환" })
  listCount: number;

  @Expose()
  @ApiProperty({
    type: WorldState,
    isArray: true,
    description: "listCount의 수만큼 조회된 world_state 리스트",
  })
  list: WorldState[];
}

export class listWorldStateSuccessReturn {
  @Expose()
  @ApiProperty({ example: "OK" })
  result: string;

  @Expose()
  @ApiProperty({ example: "SUCCESS" })
  message: string;

  @Expose()
  @ApiProperty({
    example: {
      totalCount: 47,
      listCount: 30,
      list: [
        {
          id: 613,
          name: "Vlorë District",
          country_id: 3,
          country_code: "AL",
          fips_code: "51",
          iso2: "VL",
          flag: 1,
          wiki_data_id: "Q158601",
        },
        {
          id: 634,
          name: "Vlorë County",
          country_id: 3,
          country_code: "AL",
          fips_code: "51",
          iso2: "12",
          flag: 1,
          wiki_data_id: "Q192849",
        },
        {
          id: 636,
          name: "Tropojë District",
          country_id: 3,
          country_code: "AL",
          fips_code: "51",
          iso2: "TP",
          flag: 1,
          wiki_data_id: "Q123615",
        },
        {
          id: 633,
          name: "Tirana District",
          country_id: 3,
          country_code: "AL",
          fips_code: "50",
          iso2: "TR",
          flag: 1,
          wiki_data_id: "Q201073",
        },
        {
          id: 615,
          name: "Tirana County",
          country_id: 3,
          country_code: "AL",
          fips_code: "50",
          iso2: "11",
          flag: 1,
          wiki_data_id: "Q229892",
        },
        {
          id: 616,
          name: "Tepelenë District",
          country_id: 3,
          country_code: "AL",
          fips_code: "50",
          iso2: "TE",
          flag: 1,
          wiki_data_id: "Q202656",
        },
        {
          id: 593,
          name: "Skrapar District",
          country_id: 3,
          country_code: "AL",
          fips_code: "55",
          iso2: "SK",
          flag: 1,
          wiki_data_id: "Q194381",
        },
        {
          id: 626,
          name: "Shkodër District",
          country_id: 3,
          country_code: "AL",
          fips_code: "49",
          iso2: "SH",
          flag: 1,
          wiki_data_id: "Q194176",
        },
        {
          id: 611,
          name: "Shkodër County",
          country_id: 3,
          country_code: "AL",
          fips_code: "49",
          iso2: "10",
          flag: 1,
          wiki_data_id: "Q193438",
        },
        {
          id: 624,
          name: "Sarandë District",
          country_id: 3,
          country_code: "AL",
          fips_code: "47",
          iso2: "SR",
          flag: 1,
          wiki_data_id: "Q748235",
        },
        {
          id: 620,
          name: "Pukë District",
          country_id: 3,
          country_code: "AL",
          fips_code: "50",
          iso2: "PU",
          flag: 1,
          wiki_data_id: "Q206997",
        },
        {
          id: 606,
          name: "Pogradec District",
          country_id: 3,
          country_code: "AL",
          fips_code: "41",
          iso2: "PG",
          flag: 1,
          wiki_data_id: "Q202197",
        },
        {
          id: 625,
          name: "Përmet District",
          country_id: 3,
          country_code: "AL",
          fips_code: "47",
          iso2: "PR",
          flag: 1,
          wiki_data_id: "Q121074",
        },
        {
          id: 619,
          name: "Peqin District",
          country_id: 3,
          country_code: "AL",
          fips_code: "50",
          iso2: "PQ",
          flag: 1,
          wiki_data_id: "Q202652",
        },
        {
          id: 638,
          name: "Mirditë District",
          country_id: 3,
          country_code: "AL",
          fips_code: "51",
          iso2: "MR",
          flag: 1,
          wiki_data_id: "Q236850",
        },
        {
          id: 635,
          name: "Mat District",
          country_id: 3,
          country_code: "AL",
          fips_code: "51",
          iso2: "MT",
          flag: 1,
          wiki_data_id: "Q202665",
        },
        {
          id: 637,
          name: "Mallakastër District",
          country_id: 3,
          country_code: "AL",
          fips_code: "51",
          iso2: "MK",
          flag: 1,
          wiki_data_id: "Q207437",
        },
        {
          id: 602,
          name: "Malësi e Madhe District",
          country_id: 3,
          country_code: "AL",
          fips_code: "47",
          iso2: "MM",
          flag: 1,
          wiki_data_id: "Q236845",
        },
        {
          id: 599,
          name: "Lushnjë District",
          country_id: 3,
          country_code: "AL",
          fips_code: "43",
          iso2: "LU",
          flag: 1,
          wiki_data_id: "Q206994",
        },
        {
          id: 596,
          name: "Librazhd District",
          country_id: 3,
          country_code: "AL",
          fips_code: "48",
          iso2: "LB",
          flag: 1,
          wiki_data_id: "Q207002",
        },
        {
          id: 595,
          name: "Lezhë District",
          country_id: 3,
          country_code: "AL",
          fips_code: "48",
          iso2: "LE",
          flag: 1,
          wiki_data_id: "Q194185",
        },
        {
          id: 609,
          name: "Lezhë County",
          country_id: 3,
          country_code: "AL",
          fips_code: "48",
          iso2: "08",
          flag: 1,
          wiki_data_id: "Q193436",
        },
        {
          id: 622,
          name: "Kurbin District",
          country_id: 3,
          country_code: "AL",
          fips_code: "45",
          iso2: "KB",
          flag: 1,
          wiki_data_id: "Q123602",
        },
        {
          id: 623,
          name: "Kukës District",
          country_id: 3,
          country_code: "AL",
          fips_code: "47",
          iso2: "KU",
          flag: 1,
          wiki_data_id: "Q123395",
        },
        {
          id: 601,
          name: "Kukës County",
          country_id: 3,
          country_code: "AL",
          fips_code: "47",
          iso2: "07",
          flag: 1,
          wiki_data_id: "Q231896",
        },
        {
          id: 612,
          name: "Kuçovë District",
          country_id: 3,
          country_code: "AL",
          fips_code: "49",
          iso2: "KC",
          flag: 1,
          wiki_data_id: "Q211946",
        },
        {
          id: 614,
          name: "Krujë District",
          country_id: 3,
          country_code: "AL",
          fips_code: "51",
          iso2: "KR",
          flag: 1,
          wiki_data_id: "Q205261",
        },
        {
          id: 597,
          name: "Korçë District",
          country_id: 3,
          country_code: "AL",
          fips_code: "46",
          iso2: "KO",
          flag: 1,
          wiki_data_id: "Q191491",
        },
        {
          id: 630,
          name: "Korçë County",
          country_id: 3,
          country_code: "AL",
          fips_code: "46",
          iso2: "06",
          flag: 1,
          wiki_data_id: "Q193464",
        },
        {
          id: 628,
          name: "Kolonjë District",
          country_id: 3,
          country_code: "AL",
          fips_code: "44",
          iso2: "ER",
          flag: 1,
          wiki_data_id: "Q194178",
        },
      ],
    },
  })
  data: listWorldStateData;
}

class listWorldCityData {
  @Expose()
  @ApiProperty({ description: "조회한 world_city 테이블 내의 총 데이터 수" })
  totalCount: number;

  @Expose()
  @ApiProperty({ description: "pageSize의 값만큼 조회한 리스트를 반환" })
  listCount: number;

  @Expose()
  @ApiProperty({
    type: WorldCity,
    isArray: true,
    description: "listCount의 수만큼 조회된 world_city 리스트",
  })
  list: WorldCity[];
}

export class listWorldCitySuccessReturn {
  @Expose()
  @ApiProperty({ example: "OK" })
  result: string;

  @Expose()
  @ApiProperty({ example: "SUCCESS" })
  message: string;

  @Expose()
  @ApiProperty({
    example: {
      totalCount: 12,
      listCount: 12,
      list: [
        {
          id: 46,
          name: "Sharjah",
          state_id: 3390,
          state_code: "SH",
          country_id: 231,
          country_code: "AE",
          latitude: 25,
          longitude: 55,
          flag: 1,
          wiki_data_id: "Q289693",
        },
        {
          id: 40,
          name: "Murbaḩ",
          state_id: 3390,
          state_code: "SH",
          country_id: 231,
          country_code: "AE",
          latitude: 25,
          longitude: 56,
          flag: 1,
          wiki_data_id: "Q764279",
        },
        {
          id: 39,
          name: "Milehah",
          state_id: 3390,
          state_code: "SH",
          country_id: 231,
          country_code: "AE",
          latitude: 25,
          longitude: 56,
          flag: 1,
          wiki_data_id: "Q764279",
        },
        {
          id: 36,
          name: "Khor Fakkan",
          state_id: 3390,
          state_code: "SH",
          country_id: 231,
          country_code: "AE",
          latitude: 25,
          longitude: 56,
          flag: 1,
          wiki_data_id: "Q764279",
        },
        {
          id: 35,
          name: "Khawr Fakkān",
          state_id: 3390,
          state_code: "SH",
          country_id: 231,
          country_code: "AE",
          latitude: 25,
          longitude: 56,
          flag: 1,
          wiki_data_id: "Q764279",
        },
        {
          id: 33,
          name: "Kalba",
          state_id: 3390,
          state_code: "SH",
          country_id: 231,
          country_code: "AE",
          latitude: 25,
          longitude: 56,
          flag: 1,
          wiki_data_id: "Q6742405",
        },
        {
          id: 29,
          name: "Dibba Al Hesn",
          state_id: 3390,
          state_code: "SH",
          country_id: 231,
          country_code: "AE",
          latitude: 26,
          longitude: 56,
          flag: 1,
          wiki_data_id: "Q1023786",
        },
        {
          id: 27,
          name: "Dhaid",
          state_id: 3390,
          state_code: "SH",
          country_id: 231,
          country_code: "AE",
          latitude: 25,
          longitude: 56,
          flag: 1,
          wiki_data_id: "Q1023786",
        },
        {
          id: 23,
          name: "Al Madam",
          state_id: 3390,
          state_code: "SH",
          country_id: 231,
          country_code: "AE",
          latitude: 25,
          longitude: 56,
          flag: 1,
          wiki_data_id: "Q234600",
        },
        {
          id: 22,
          name: "Al Hamriyah",
          state_id: 3390,
          state_code: "SH",
          country_id: 231,
          country_code: "AE",
          latitude: 25,
          longitude: 56,
          flag: 1,
          wiki_data_id: "Q234600",
        },
        {
          id: 18,
          name: "Al Batayih",
          state_id: 3390,
          state_code: "SH",
          country_id: 231,
          country_code: "AE",
          latitude: 25,
          longitude: 56,
          flag: 1,
          wiki_data_id: "Q234600",
        },
        {
          id: 13,
          name: "Adh Dhayd",
          state_id: 3390,
          state_code: "SH",
          country_id: 231,
          country_code: "AE",
          latitude: 25,
          longitude: 56,
          flag: 1,
          wiki_data_id: "Q3492826",
        },
      ],
    },
  })
  data: listWorldCityData;
}

export class worldCountryFailReturn {
  @Expose()
  @ApiProperty({ example: "FAIL" })
  result: string;

  @Expose()
  @ApiProperty({ example: "FAIL" })
  message: string;

  @Expose()
  @ApiProperty({ example: null })
  data: null;
}

export class worldStateFailReturn {
  @Expose()
  @ApiProperty({ example: "FAIL" })
  result: string;

  @Expose()
  @ApiProperty({ example: "FAIL" })
  message: string;

  @Expose()
  @ApiProperty({ example: null })
  data: null;
}

export class worldCityFailReturn {
  @Expose()
  @ApiProperty({ example: "FAIL" })
  result: string;

  @Expose()
  @ApiProperty({ example: "FAIL" })
  message: string;

  @Expose()
  @ApiProperty({ example: null })
  data: null;
}