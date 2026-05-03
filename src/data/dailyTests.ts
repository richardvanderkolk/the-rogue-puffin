export interface Question {
    id: number;
    text: string;
    options: string[];
    correctIndex: number;
}

export interface DailyTest {
    day: number;
    text: string;
    questions: Question[];
}

export const DAILY_TESTS: DailyTest[] = [
    // Day 1
    {
        day: 1,
        text: `The Boy who cried Wolf lived in a small village near the mountains. Every day he took his sheep up the hill to graze. Bored with his daily routine, he decided to play a trick on the villagers. "Wolf! Wolf!" he cried out loudly. The villagers dropped their tools and ran up the hill to save the sheep, only to find the boy laughing at them. A few days later, he played the same trick again. Once more, the villagers rushed to his aid, and once more, they were fooled. But one evening, as the sun was setting, a real wolf emerged from the forest. The boy, terrified, screamed "Wolf! Wolf!" as loud as he could. But the villagers, believing it was just another trick, ignored his cries. The wolf attacked the flock, and the boy learned a hard lesson about honesty.`,
        questions: [
            { id: 1, text: "Why did the boy cry 'Wolf' the first time?", options: ["He was bored", "He saw a real wolf", "He wanted to test the villagers", "He was lonely"], correctIndex: 0 },
            { id: 2, text: "How did the villagers react the second time?", options: ["They ignored him", "They rushed to his aid", "They scolded him", "They laughed with him"], correctIndex: 1 },
            { id: 3, text: "What happened when the real wolf appeared?", options: ["The villagers saved the sheep", "The boy fought the wolf", "The villagers ignored his cries", "The wolf ran away"], correctIndex: 2 }
        ]
    },
    // Day 2
    {
        day: 2,
        text: `The Lion and the Mouse is a story of unexpected friendship. A lion was awakened from sleep by a mouse running over his face. Rising up angrily, he caught him and was about to kill him, when the mouse piteously entreated, saying: "If you would only spare my life, I would be sure to repay your kindness." The lion laughed and let him go. It happened shortly after this that the lion was caught by some hunters, who bound him by strong ropes to the ground. The mouse, recognizing his roar, came and gnawed the rope with his teeth and set him free, exclaiming: "You ridiculed the idea of my ever being able to help you, expecting to receive from me no reward. Now you know that it is possible for even a mouse to confer benefits on a lion."`,
        questions: [
            { id: 1, text: "How did the mouse wake the lion?", options: ["By squeaking loudly", "By running over his face", "By biting his tail", "By dropping a nut"], correctIndex: 1 },
            { id: 2, text: "Why did the lion let the mouse go?", options: ["He felt sorry for it", "He laughed at the idea the mouse could help him", "He was not hungry", "He was afraid of mice"], correctIndex: 1 },
            { id: 3, text: "How did the mouse save the lion?", options: ["By scaring the hunters", "By gnawing the ropes", "By bringing other animals", "By roaring loudly"], correctIndex: 1 }
        ]
    },
    // Day 3
    {
        day: 3,
        text: `The Ant and the Grasshopper were neighbors in a sunny field. All summer long, the Ant worked tirelessly, gathering food and storing it in his house for the winter. The Grasshopper, on the other hand, spent his days singing, dancing, and playing his fiddle, mocking the Ant for working so hard in the beautiful weather. "Why bother about winter?" said the Grasshopper. "We have plenty of food at present." But the Ant kept on his way and continued his toil. When the winter came, the Grasshopper had no food and found himself dying of hunger, while it saw the ants distributing every day corn and grain from the stores they had collected in the summer. Then the Grasshopper knew: It is best to prepare for the days of necessity.`,
        questions: [
            { id: 1, text: "What did the Ant do all summer?", options: ["Played the fiddle", "Gathered food", "Slept in the sun", "Built a new house"], correctIndex: 1 },
            { id: 2, text: "How did the Grasshopper treat the Ant in the summer?", options: ["He helped him", "He mocked him", "He ignored him", "He fed him"], correctIndex: 1 },
            { id: 3, text: "What is the moral of the story?", options: ["Winter is cold", "Ants are hard workers", "Prepare for days of necessity", "Music is important"], correctIndex: 2 }
        ]
    },
    // Day 4
    {
        day: 4,
        text: `The Crow and the Pitcher demonstrates that necessity is the mother of invention. In a spell of dry weather, when the birds could find very little to drink, a thirsty Crow found a pitcher with a little water in it. But the pitcher was high and had a narrow neck, and no matter how he tried, the Crow could not reach the water. The poor thing felt as if he must die of thirst. Then an idea came to him. Picking up some small pebbles, he dropped them into the pitcher one by one. With each pebble the water rose a little higher until at last it was near enough so he could drink.`,
        questions: [
            { id: 1, text: "What problem did the crow face?", options: ["The water was poisoned", "He could not reach the water", "The pitcher was broken", "Another bird stole the pitcher"], correctIndex: 1 },
            { id: 2, text: "How did the crow solve the problem?", options: ["He broke the pitcher", "He found a different puddle", "He dropped pebbles into the pitcher", "He waited for rain"], correctIndex: 2 },
            { id: 3, text: "What does the story demonstrate?", options: ["Crows are strong", "Necessity is the mother of invention", "Water is heavy", "Pebbles float"], correctIndex: 1 }
        ]
    },
    // Day 5
    {
        day: 5,
        text: `The Fox and the Grapes is a tale about sour grapes. One hot summer's day a Fox was strolling through an orchard till he came to a bunch of grapes just ripening on a vine which had been trained over a lofty branch. "Just the thing to quench my thirst," quoth he. Drawing back a few paces, he took a run and a jump, and just missed the bunch. Turning round again with a One, Two, Three, he jumped up, but with no greater success. Again and again he tried after the tempting morsel, but at last had to give it up, and walked away with his nose in the air, saying: "I am sure they are sour." It is easy to despise what you cannot get.`,
        questions: [
            { id: 1, text: "What was the Fox trying to reach?", options: ["An apple", "A bunch of grapes", "A bird's nest", "A pear"], correctIndex: 1 },
            { id: 2, text: "How did the Fox try to reach them?", options: ["By climbing the tree", "By using a stick", "By running and jumping", "By asking for help"], correctIndex: 2 },
            { id: 3, text: "What did the Fox say when he finally gave up?", options: ["They are too high", "They are sour", "I am not thirsty", "I will come back tomorrow"], correctIndex: 1 }
        ]
    },
    // Day 6
    {
        day: 6,
        text: `The Dog and the Shadow teaches a lesson about greed. It happened that a Dog had got a piece of meat and was carrying it home in his mouth to eat it in peace. Now on his way home he had to cross a plank lying across a running brook. As he crossed, he looked down and saw his own shadow reflected in the water beneath. Thinking it was another dog with another piece of meat, he made up his mind to have that also. So he made a snap at the shadow in the water, but as he opened his mouth the piece of meat fell out, dropped into the water and was never seen more. Beware lest you lose the substance by grasping at the shadow.`,
        questions: [
            { id: 1, text: "What was the dog carrying?", options: ["A bone", "A stick", "A piece of meat", "A toy"], correctIndex: 2 },
            { id: 2, text: "What did the dog see in the water?", options: ["A fish", "His own shadow", "Another dog", "A floating log"], correctIndex: 1 },
            { id: 3, text: "What happened to his meat?", options: ["He ate it", "Another dog stole it", "It fell into the water", "He buried it"], correctIndex: 2 }
        ]
    },
    // Day 7
    {
        day: 7,
        text: `The Wind and the Sun were disputing which was the stronger. Suddenly they saw a traveler coming down the road, and the Sun said: "I see a way to decide our dispute. Whichever of us can cause that traveler to take off his cloak shall be regarded as the stronger." So the Sun retired behind a cloud, and the Wind began to blow as hard as it could upon the traveler. But the harder he blew the more closely did the traveler wrap his cloak round him, till at last the Wind had to give up in despair. Then the Sun came out and shone in all his glory upon the traveler, who soon found it too hot to walk with his cloak on. Kindness effects more than severity.`,
        questions: [
            { id: 1, text: "What were the Wind and the Sun arguing about?", options: ["Who was older", "Who was stronger", "Who was faster", "Who was brighter"], correctIndex: 1 },
            { id: 2, text: "What was the challenge?", options: ["Make the traveler run", "Make the traveler sleep", "Make the traveler take off his cloak", "Make the traveler drop his bag"], correctIndex: 2 },
            { id: 3, text: "How did the traveler react to the wind?", options: ["He took off his cloak", "He wrapped his cloak tighter", "He hid behind a tree", "He started to run"], correctIndex: 1 }
        ]
    },
    // Day 8
    {
        day: 8,
        text: `The Goose that Laid the Golden Eggs is a classic tale of greed. A man and his wife had the good fortune to possess a goose which laid a golden egg every day. Lucky though they were, they soon began to think they were not getting rich fast enough, and, imagining the bird must be made of gold inside, they decided to kill it in order to secure the whole store of precious metal at once. But when they cut it open they found it was just like any other goose. Thus, they neither got rich all at once, as they had hoped, nor enjoyed any longer the daily addition to their wealth. Much wants more and loses all.`,
        questions: [
            { id: 1, text: "How often did the goose lay a golden egg?", options: ["Once a week", "Every day", "Once a month", "Only in spring"], correctIndex: 1 },
            { id: 2, text: "Why did the couple decide to kill the goose?", options: ["To eat it", "To find all the gold inside", "Because it stopped laying eggs", "Because it was loud"], correctIndex: 1 },
            { id: 3, text: "What did they find inside the goose?", options: ["Solid gold", "Silver", "Nothing unusual", "Another egg"], correctIndex: 2 }
        ]
    },
    // Day 9
    {
        day: 9,
        text: `The Tortoise and the Birds is a story about talking too much. A Tortoise, lazily basking in the sun, complained to the sea-birds of her hard fate, that no one would teach her to fly. An Eagle, hovering near, heard her lamentation and asked what reward she would give him if he would take her aloft and float her in the air. "I will give you," she said, "all the riches of the Red Sea." "I will teach you to fly then," said the Eagle; and taking her up in his talons he carried her almost to the clouds, when suddenly he let her go. She fell on a lofty mountain, dashing her shell to pieces. The Tortoise had learned that some things are not meant to be.`,
        questions: [
            { id: 1, text: "What did the Tortoise want to do?", options: ["Swim fast", "Climb a tree", "Fly", "Run"], correctIndex: 2 },
            { id: 2, text: "Who offered to help the Tortoise?", options: ["A sea-gull", "An Eagle", "A Hawk", "A Pelican"], correctIndex: 1 },
            { id: 3, text: "What happened when the Eagle let her go?", options: ["She flew away", "She landed safely", "She fell and her shell broke", "She caught a fish"], correctIndex: 2 }
        ]
    },
    // Day 10
    {
        day: 10,
        text: `The Mice in Council met to discuss a great problem. The mice had been living in fear of a cat that prowled the house, catching them one by one. Finally, they called a council to decide on a plan to protect themselves. A young mouse stood up and proposed that a bell be hung around the cat's neck so they could hear her coming. All the mice cheered at this brilliant idea. But then an old, wise mouse stood up and asked, "That is a very good plan, but who is going to bell the cat?" The mice looked at one another in silence. It is easy to propose impossible remedies.`,
        questions: [
            { id: 1, text: "Why were the mice afraid?", options: ["A dog", "A cat", "A snake", "The homeowner"], correctIndex: 1 },
            { id: 2, text: "What was the young mouse's plan?", options: ["Build a trap", "Leave the house", "Hang a bell on the cat", "Fight the cat"], correctIndex: 2 },
            { id: 3, text: "What did the old mouse point out?", options: ["The bell was too heavy", "The cat was deaf", "No one was brave enough to do it", "They didn't have a bell"], correctIndex: 2 }
        ]
    },
    // Day 11
    {
        day: 11,
        text: `The Farmer and the Stork teaches about the company you keep. A Farmer placed nets on his newly-sown plowlands to catch the cranes that came to pick up his seed. When he returned to check the nets, he found several cranes and also a Stork. The Stork pleaded for his life, saying, "Please let me go. I am not a crane. I am a stork, a bird of excellent character, and I honor my parents." The Farmer laughed and said, "It may be true, but I have caught you with the thieves, and you must suffer the same punishment as they do." He who keeps bad company will be judged by it.`,
        questions: [
            { id: 1, text: "Why did the farmer set nets?", options: ["To catch fish", "To catch cranes stealing seed", "To catch rabbits", "To protect his chickens"], correctIndex: 1 },
            { id: 2, text: "Who was caught along with the cranes?", options: ["A duck", "A stork", "A crow", "A pigeon"], correctIndex: 1 },
            { id: 3, text: "Why did the farmer refuse to let the stork go?", options: ["The stork was a thief too", "The stork looked like a crane", "He was caught with the thieves", "The farmer wanted to eat it"], correctIndex: 2 }
        ]
    },
    // Day 12
    {
        day: 12,
        text: `The Astronomer was accustomed to go out every night to observe the stars. One evening, as he wandered through the suburbs with his whole attention fixed on the sky, he accidentally fell into a deep well. While he lamented and bewailed his sores and bruises, and cried loudly for help, a neighbor ran to the well, and learning what had happened said: "Hark ye, old fellow, why, in striving to pry into what is in heaven, do you not manage to see what is on earth?" Keep your feet on the ground, even when your head is in the clouds.`,
        questions: [
            { id: 1, text: "What was the Astronomer doing?", options: ["Looking for money", "Observing the stars", "Walking his dog", "Catching fireflies"], correctIndex: 1 },
            { id: 2, text: "What happened to him?", options: ["He got lost", "He fell asleep", "He fell into a well", "He was robbed"], correctIndex: 2 },
            { id: 3, text: "What did the neighbor tell him?", options: ["He should stay indoors", "He should pay attention to what is on earth", "He should buy a telescope", "He should watch for thieves"], correctIndex: 1 }
        ]
    },
    // Day 13
    {
        day: 13,
        text: `The Wolf in Sheep's Clothing is a tale of deception. A Wolf found great difficulty in getting at the sheep owing to the vigilance of the shepherd and his dogs. But one day it found the skin of a sheep that had been flayed and thrown aside, so it put it on over its own pelt and strolled down among the sheep. The Lamb that belonged to the sheep whose skin the Wolf was wearing began to follow the Wolf in the Sheep's clothing. So, leading the Lamb a little apart, he soon made a meal off her, and for some time he succeeded in deceiving the sheep, and enjoying hearty meals. Appearances are deceptive.`,
        questions: [
            { id: 1, text: "Why couldn't the wolf get to the sheep?", options: ["The fence was too high", "The shepherd and dogs were vigilant", "The sheep ran too fast", "The wolf was injured"], correctIndex: 1 },
            { id: 2, text: "How did the wolf disguise himself?", options: ["He painted himself white", "He hid behind a bush", "He wore a sheep's skin", "He acted like a dog"], correctIndex: 2 },
            { id: 3, text: "Who followed the wolf?", options: ["The shepherd", "The dog", "A lamb", "Another wolf"], correctIndex: 2 }
        ]
    },
    // Day 14
    {
        day: 14,
        text: `The North Wind and the Sun is a story of persuasion. The North Wind and the Sun had a quarrel about which of them was the stronger. While they were disputing with much heat and bluster, a Traveler passed along the road wrapped in a cloak. "Let us agree," said the Sun, "that he is the stronger who can strip that Traveler of his cloak." "Very well," growled the North Wind, and at once sent a cold, howling blast against the Traveler. With the first gust of wind the ends of the cloak whipped about the Traveler's body. But he immediately wrapped it closely around him, and the harder the Wind blew, the tighter he held it. The Sun then shone out warmly. The Traveler unfastened his cloak, and soon took it off entirely. Persuasion is better than force.`,
        questions: [
            { id: 1, text: "What were the North Wind and the Sun arguing about?", options: ["Who was older", "Who was stronger", "Who was faster", "Who was brighter"], correctIndex: 1 },
            { id: 2, text: "What did the North Wind try to do?", options: ["Blow the traveler away", "Make the traveler run", "Blow the cloak off", "Freeze the traveler"], correctIndex: 2 },
            { id: 3, text: "Why did the traveler take off his cloak?", options: ["The wind was too strong", "The sun made him warm", "He arrived home", "He wanted to swim"], correctIndex: 1 }
        ]
    }
];
