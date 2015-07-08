var utils = {
  getDateTime: function gdt () {
      var date = new Date();
      var hour = date.getHours();
      hour = (hour < 10 ? '0': '') + hour;
      var min = date.getMinutes();
      min = (min < 10 ? '0': '') + min;
      var sec = date.getSeconds();
      sec = (sec < 10 ? '0': '') + sec;
      return hour + ':' + min + ':' + sec;
  },
  randomName: function rn (data) {
      data = [['able', 'clean', 'enthusiastic', 'heartening', 'meek', 'reasonable', 'talented
        accommodating', 'clever', 'ethical', 'helpful', 'meritorious', 'refined', 'temperate
        accomplished', 'commendable', 'excellent', 'high-class', 'moral', 'reliable', 'terrific
        adept', 'compassionate', 'exceptional', 'honest', 'neat', 'remarkable', 'tidy
        admirable', 'composed', 'exemplary', 'honorable', 'noble', 'resilient', 'top quality
        agreeable', 'considerate', 'exquisite', 'hopeful', 'obliging', 'respectable', 'tremendous
        amazing', 'consummate', 'extraordinary', 'humble', 'observant', 'respectful', 'trustworthy
        appealing', 'cooperative', 'fabulous', 'important', 'optimistic', 'resplendent', 'trusty
        astute', 'correct', 'faithful', 'impressive', 'organized', 'responsible', 'truthful
        attractive', 'courageous', 'fantastic', 'incisive', 'outstanding', 'robust', 'unbeatable
        awesome', 'courteous', 'fascinating', 'incredible', 'peaceful', 'selfless', 'understanding
        beautiful', 'dazzling', 'fine', 'innocent', 'perceptive', 'sensational', 'unequaled
        benevolent', 'decent', 'first-class', 'insightful', 'perfect', 'sensible', 'unparalleled
        brave', 'delightful', 'fortitudinous', 'inspiring', 'pleasant', 'serene', 'upbeat
        breathtaking', 'dependable', 'gallant', 'intelligent', 'pleasing', 'sharp', 'valiant
        bright', 'devoted', 'generous', 'joyful', 'polite', 'shining', 'valuable
        brilliant', 'diplomatic', 'gentle', 'judicious', 'positive', 'shrewd', 'vigilant
        bubbly', 'discerning', 'gifted', 'just', 'praiseworthy', 'smart', 'vigorous
        buoyant', 'disciplined', 'giving', 'kindly', 'precious', 'sparkling', 'virtuous
        calm', 'elegant', 'gleaming', 'laudable', 'priceless', 'spectacular', 'well mannered
        capable', 'elevating', 'glowing', 'likable', 'principled', 'splendid', 'wholesome
        charitable', 'enchanting', 'good', 'lovable', 'prompt', 'steadfast', 'wise
        charming', 'encouraging', 'gorgeous', 'lovely', 'prudent', 'stunning', 'witty
        chaste', 'endearing', 'graceful', 'loyal', 'punctual', 'super', 'wonderful
        cheerful', 'energetic', 'gracious', 'luminous', 'pure', 'superb', 'worthy
        chivalrous', 'engaging', 'great', 'magnanimous', 'quick', 'superior', 'zesty
        gallant', 'enhanced', 'happy', 'magnificent', 'radiant', 'supportive', '
        civil', 'enjoyable', 'hardy', 'marvelous', 'rational', 'supreme'],
        ['Black Panther', 'Black Widow', 'Cable', 'Captain America', 'Colossus',
          'Cyclops', 'Daredevil', 'Deadpool', 'Doctor Strange', 'Dr. Doom',
          'Emma Frost', 'Gambit', 'Ghost Rider', 'Hawkeye', 'Hulk',
          'Human Torch', 'Iceman', 'Invisible Woman', 'Iron Man',
          'Jean Grey', 'Juggernaut', 'Loki', 'Luke Cage', 'Magneto',
          'Moon Knight', 'Mr. Fantastic', 'Ms. Marvel', 'Nightcrawler',
          'Nova', 'Psylocke', 'Punisher', 'Rocket Raccoon', 'Rogue',
          'Scarlet Witch', 'She-Hulk', 'Silver Surfer', 'Spider-Man',
          'Squirrel Girl', 'Star-Lord', 'Storm', 'Taskmaster', 'Thing',
          'Thor', 'Venom', 'Vision', 'Winter Soldier', 'Wolverine', 'X-23',
          'Aquaman', 'Atom', 'Batgirl', 'Batman', 'Beast Boy',
          'Black Canary', 'Catwoman', 'Constantine', 'Firestorm',
          'Green Arrow', 'Green-lantern', 'Harley-quinn', 'Joker', 'Luthor',
          'Lois-lane', 'Mera', 'Nightwing', 'Pandora', 'Penguin', 'Plastic-man',
          'Raven', 'Robin', 'Scarecrow', 'Shazam', 'Sinestro', 'Starfire',
          'Supergirl', 'Superman', 'The Flash', 'Wonder Woman']
      ];




      var no1 = data[0][Math.round(Math.random() * (data[0].length - 1))];
      var no2 = data[1][Math.round(Math.random() * (data[1].length - 1))];
      var no3 = data[2][Math.round(Math.random() * (data[2].length - 1))];
      var no4 = data[3][Math.round(Math.random() * (data[3].length - 1))];
      return no1 + '. ' + no2 + '-' + no3 + ' ' + no4;
  }
}

module.exports = utils;
