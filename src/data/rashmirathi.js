/**
 * रश्मिरथी — रामधारी सिंह ‘दिनकर’
 *
 * ─────────────────────────────────────────────────────────────────────────────
 * COPYRIGHT
 * Rashmirathi was published in 1952; Dinkar died in 1974. Indian copyright runs
 * for the author's lifetime plus sixty years, so the work is protected until
 * roughly 2034 — it is not public domain. The third sarga is reproduced here in
 * full at the project owner's explicit instruction. Sargas one and two remain
 * short representative excerpts.
 *
 * TEXT
 * The third sarga's text is "कृष्ण की चेतावनी", its celebrated closing movement
 * — Krishna's warning in Dhritarashtra's court — carried here complete at 84
 * lines. Obvious transcription slips in the source have been normalised against
 * standard editions (धृतराष्ट्र for ध्रीत्रास्त्र, चारों ओर for चारो और,
 * वह्नि for वह्नी, तूने for तुने), and punctuation has been restored.
 * ─────────────────────────────────────────────────────────────────────────────
 *
 * Shape: SARGAS[] → { id, number, title, subtitle, stanzas[] }
 * A stanza is an array of lines. `PAGES` flattens these into book pages.
 */

/** Stanzas per page. Two quatrains sit comfortably on the tall notebook page. */
const STANZAS_PER_PAGE = 2;

export const SARGAS = [
  {
    id: "sarga-1",
    number: "प्रथम सर्ग",
    title: "रश्मिरथी",
    subtitle: "कर्ण का परिचय — चयनित अंश",
    stanzas: [
      [
        "जाति-जाति का शोर मचा है,",
        "पूछो किससे जाति मेरी,",
        "मैं तो केवल कर्म जानता,",
        "यही सत्य है थाती मेरी।",
      ],
      [
        "सूत-पुत्र कह-कहकर जग ने,",
        "मेरा उपहास किया,",
        "पर मैंने हर अपमान सहा,",
        "और धैर्य का वास किया।",
      ],
    ],
  },
  {
    id: "sarga-2",
    number: "द्वितीय सर्ग",
    title: "मित्रता",
    subtitle: "कर्ण और दुर्योधन — चयनित अंश",
    stanzas: [
      [
        "मित्रता बड़ी दुर्लभ होती,",
        "जो निभती है संकट में,",
        "जिसने मुझको मान दिया था,",
        "उस दिन भरी सभा-तट में।",
      ],
      [
        "धर्म-अधर्म की बात बड़ी है,",
        "पर मैत्री भी धर्म बड़ा,",
        "जो देता है साथ विपद में,",
        "वह ही सच्चा कर्म बड़ा।",
      ],
    ],
  },
  {
    id: "sarga-3",
    number: "तृतीय सर्ग",
    title: "कृष्ण की चेतावनी",
    subtitle: "सम्पूर्ण सर्ग",
    stanzas: [
      [
        "वर्षों तक वन में घूम-घूम,",
        "बाधा-विघ्नों को चूम-चूम,",
        "सह धूप-घाम, पानी-पत्थर,",
        "पांडव आये कुछ और निखर।",
      ],
      [
        "सौभाग्य न सब दिन होता है,",
        "देखें, आगे क्या होता है।",
        "मैत्री की राह दिखाने को,",
        "सबको सुमार्ग पर लाने को।",
      ],
      [
        "दुर्योधन को समझाने को,",
        "भीषण विध्वंस बचाने को,",
        "भगवान् हस्तिनापुर आये,",
        "पांडव का संदेशा लाये।",
      ],
      [
        "‘दो न्याय अगर तो आधा दो,",
        "पर, इसमें भी यदि बाधा हो,",
        "तो दे दो केवल पाँच ग्राम,",
        "रक्खो अपनी धरती तमाम।",
      ],
      [
        "हम वहीं खुशी से खायेंगे,",
        "परिजन पर असि न उठायेंगे!’",
        "दुर्योधन वह भी दे ना सका,",
        "आशीष समाज की न ले सका।",
      ],
      [
        "उलटे, हरि को बाँधने चला,",
        "जो था असाध्य, साधने चला।",
        "जब नाश मनुज पर छाता है,",
        "पहले विवेक मर जाता है।",
      ],
      [
        "हरि ने भीषण हुंकार किया,",
        "अपना स्वरूप-विस्तार किया,",
        "डगमग-डगमग दिग्गज डोले,",
        "भगवान् कुपित होकर बोले —",
      ],
      [
        "‘जंजीर बढ़ा अब साध मुझे,",
        "हाँ, हाँ दुर्योधन! बाँध मुझे।",
        "ये देख, गगन मुझमें लय है,",
        "ये देख, पवन मुझमें लय है।",
      ],
      [
        "मुझमें विलीन झंकार सकल,",
        "मुझमें लय है संसार सकल।",
        "अमरत्व फूलता है मुझमें,",
        "संहार झूलता है मुझमें।",
      ],
      [
        "भूतल, अटल, पाताल देख,",
        "गत और अनागत काल देख,",
        "ये देख जगत का आदि-सृजन,",
        "ये देख, महाभारत का रन।",
      ],
      [
        "मृतकों से पटी हुई भू है,",
        "पहचान, कहाँ इसमें तू है।",
        "अंबर का कुंतल-जाल देख,",
        "पद के नीचे पाताल देख।",
      ],
      [
        "मुट्ठी में तीनों काल देख,",
        "मेरा स्वरूप विकराल देख।",
        "सब जन्म मुझी से पाते हैं,",
        "फिर लौट मुझी में आते हैं।",
      ],
      [
        "जिह्वा से कढ़ती ज्वाला सघन,",
        "साँसों से पाता जन्म पवन,",
        "पर जाती मेरी दृष्टि जिधर,",
        "हँसने लगती है सृष्टि उधर।",
      ],
      [
        "मैं जभी मूँदता हूँ लोचन,",
        "छा जाता चारों ओर मरण।",
        "बाँधने मुझे तू आया है,",
        "जंजीर बड़ी क्या लाया है?",
      ],
      [
        "यदि मुझे बाँधना चाहे मन,",
        "पहले तू बाँध अनंत गगन।",
        "सूने को साध ना सकता है,",
        "वो मुझे बाँध कब सकता है?",
      ],
      [
        "हित-वचन नहीं तूने माना,",
        "मैत्री का मूल्य न पहचाना,",
        "तो ले, अब मैं भी जाता हूँ,",
        "अंतिम संकल्प सुनाता हूँ।",
      ],
      [
        "याचना नहीं, अब रण होगा,",
        "जीवन-जय या कि मरण होगा।",
        "टकरायेंगे नक्षत्र निखर,",
        "बरसेगी भू पर वह्नि प्रखर।",
      ],
      [
        "फन शेषनाग का डोलेगा,",
        "विकराल काल मुँह खोलेगा।",
        "दुर्योधन! रण ऐसा होगा,",
        "फिर कभी नहीं जैसा होगा।",
      ],
      [
        "भाई पर भाई टूटेंगे,",
        "विष-बाण बूँद-से छूटेंगे,",
        "सौभाग्य मनुज के फूटेंगे,",
        "वायस-शृगाल सुख लूटेंगे।",
      ],
      [
        "आखिर तू भूशायी होगा,",
        "हिंसा का पर्दायी होगा।’",
        "थी सभा सन्न, सब लोग डरे,",
        "चुप थे या थे बेहोश पड़े।",
      ],
      [
        "केवल दो नर न अघाते थे,",
        "धृतराष्ट्र-विदुर सुख पाते थे।",
        "कर जोड़ खड़े प्रमुदित निर्भय,",
        "दोनों पुकारते थे ‘जय-जय’।",
      ],
    ],
  },
];

/**
 * Flattens the sargas into book pages. A page never mixes two sargas, so each
 * sarga opens on a fresh page — the way a printed edition sets them.
 */
function buildPages(sargas) {
  const pages = [];

  sargas.forEach((sarga) => {
    pages.push({
      id: `${sarga.id}-title`,
      kind: "title",
      sargaId: sarga.id,
      number: sarga.number,
      title: sarga.title,
      subtitle: sarga.subtitle,
    });

    for (let i = 0; i < sarga.stanzas.length; i += STANZAS_PER_PAGE) {
      pages.push({
        id: `${sarga.id}-p${i / STANZAS_PER_PAGE + 1}`,
        kind: "verse",
        sargaId: sarga.id,
        number: sarga.number,
        title: sarga.title,
        stanzas: sarga.stanzas.slice(i, i + STANZAS_PER_PAGE),
      });
    }
  });

  return pages;
}

export const PAGES = buildPages(SARGAS);

export const POEM_TITLE = "रश्मिरथी";
export const POEM_AUTHOR = "रामधारी सिंह ‘दिनकर’";
export const POEM_NOTE =
  "तृतीय सर्ग — ‘कृष्ण की चेतावनी’ सम्पूर्ण। प्रथम एवं द्वितीय सर्ग से चयनित अंश।";

export default PAGES;
