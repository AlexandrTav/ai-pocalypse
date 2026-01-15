// tasks.js

export const bossTasks = [
  {
    id: 1,
    difficulty: "⭐ Easy",
    title: "Temperature Converter",
    description: `
Read a temperature in Celsius and convert it to:
• Kelvin
• Fahrenheit

Formulas:
Kelvin = C + 273.15
Fahrenheit = C * 9/5 + 32

Output both values on one line.
  `,
    tests: [
      { input: "0", expected: "273.15 32" },
      { input: "25", expected: "298.15 77" }
    ]
  },

  {
    id: 2,
    difficulty: "⭐ Easy",
    title: "Integer Division",
    description: `
Read two positive integers a and b.
Print:
• the integer quotient of a / b
• the remainder of a / b

Example:
7 3 → 2 1
  `,
    tests: [
      { input: "11 3", expected: "3 2" },
      { input: "10 5", expected: "2 0" }
    ]
  },

  {
    id: 3,
    difficulty: "⭐⭐ Medium",
    title: "Triangle Classification",
    description: `
Read three side lengths a, b, c.

Steps:
1) Check that all values are > 0.
2) Check if a triangle can be formed.
3) Print triangle type or invalid if it can't be formed:
   • equilateral
   • isosceles
   • scalene
   • invalid
4) Print the perimeter or 0 if invalid.

Output format:
type perimeter

Example:
0 1 2 -> invalid 0
4 4 6 -> isosceles 14

  `,
    tests: [
      { input: "3 3 3", expected: "equilateral 9" },
      { input: "3 4 5", expected: "scalene 12" }
    ]
  },

  {
    id: 4,
    difficulty: "⭐ Easy",
    title: "Zoo Caretaker",
    description: `
A zoo has:
• p parrots (10 min each)
• m monkeys (15 min each)

The caretaker works 8 hours minus a 30 min break.

Check if the caretaker can finish all work in one day.
Print YES or NO.
  `,
    tests: [
      { input: "10 5", expected: "YES" },
      { input: "30 20", expected: "NO" }
    ]
  },

  {
    id: 5,
    difficulty: "⭐⭐ Medium",
    title: "BMI Calculator",
    description: `
Read height (m) and weight (kg).
Compute BMI = weight / (height^2).

Print the category:
• underweight (BMI < 19)
• normal (19 <= BMI < 25)
• overweight (25 <= BMI < 30)
• obesity1 (30 <= BMI < 35)
• obesity2 (35 <= BMI < 40)
• obesity3 (BMI >= 40)
  `,
    tests: [
      { input: "1.80 60", expected: "underweight" },
      { input: "1.70 120", expected: "obesity3" }
    ]
  },

  {
    id: 6,
    difficulty: "⭐⭐ Medium",
    title: "Average and Count of Numbers",
    description: `
You are given integers ending with 0 (0 is not included).

Compute:
• how many non-zero numbers were entered
• their average (exactly 2 digits after the decimal point)
• whether the count is even or odd


  `,
    tests: [
      { input: "5 -2 7 0", expected: "3 3.33 odd" },
      { input: "10 20 30 0", expected: "3 20.00 even" }
    ]
  },

  {
    id: 7,
    difficulty: "⭐ Easy",
    title: "Geometric Sequence",
    description: `
Print all terms of a geometric sequence starting at 'start',
multiplying by 'ratio', and stopping before exceeding 'limit'.

Example:
1 3 14 → 1 3 9

Input format:
start ratio limit
  `,
    tests: [
      { input: "4 3 34", expected: "4 12" },
      { input: "2 2 20", expected: "2 4 8 16" }
    ]
  },

  {
    id: 8,
    difficulty: "⭐ Easy",
    title: "Divisors of a Number",
    description: `
Print all divisors of n and the total count.

Output:
divisors: a,b,c count: X
  `,
    tests: [
      { input: "6", expected: "divisors: 1,2,3,6 count: 4" },
      { input: "10", expected: "divisors: 1,2,5,10 count: 4" }
    ]
  },

  {
    id: 9,
    difficulty: "⭐⭐ Medium",
    title: "Yurt Perimeter and Cover Area",
    description: `
Given height and diameter:

Compute:
• perimeter = 2 * π * r
• cover area = circle area + rectangle area
  circle = π * r^2
  rectangle = height * perimeter

Use π = 3.14.

Output:
perimeter: X cover: Y
  `,
    tests: [
      { input: "2 4", expected: "perimeter: 12.56 cover: 37.68" },
      { input: "3 6", expected: "perimeter: 18.84 cover: 84.78" }
    ]
  },

  {
    id: 10,
    difficulty: "⭐⭐ Medium",
    title: "Analyze an Integer",
    description: `
Given an integer n (not zero):

1) Print whether it is POSITIVE or NEGATIVE.
2) Print its absolute value.
3) If 1 ≤ |n| ≤ 1000:
   • print binary form of its absolute value
   • print whether it has 1, 2, or 3 digits
   • print which of these numbers divide it: 2, 3, 5, 7, 11

Output format (one line):
sign: ... abs: ... inRange: YES|NO binary: ... digits: ... divisibleBy: a,b,c

If the number is not in range, use:
binary: N/A digits: N/A divisibleBy: N/A
  `,
    tests: [
      {
        input: "-15",
        expected: "sign: NEGATIVE abs: 15 inRange: YES binary: 1111 digits: 2 divisibleBy: 3,5"
      },
      {
        input: "1234",
        expected: "sign: POSITIVE abs: 1234 inRange: NO binary: N/A digits: N/A divisibleBy: N/A"
      }
    ]
  },

  {
    id: 11,
    difficulty: "⭐ Easy",
    title: "Character Shift",
    description: `
Read a character c and an integer shift k.
Shift the character by k positions in the ASCII table.
Print the resulting character.

Input:
c k

Example:
A 7 → H
A -1 → @
  `,
    tests: [
      { input: "T 15", expected: "c" },
      { input: "A -2", expected: "?" }
    ]
  },

  {
    id: 12,
    difficulty: "⭐⭐ Medium",
    title: "Caesar Cipher",
    description: `
Implement a Caesar cipher.

Input:
• TEXT (uppercase A–Z, no spaces)
• SHIFT (integer, can be negative)

Shift letters cyclically:
A→D with shift 3
X→A with shift 3
A→Z with shift -1

Output:
ciphered text
  `,
    tests: [
      { input: "ABC 3", expected: "DEF" },
      { input: "XYZ 3", expected: "ABC" },
      { input: "HELLO 1", expected: "IFMMP" }
    ]
  },

  {
    id: 13,
    difficulty: "⭐ Easy",
    title: "Bonus and Season Ticket Value",
    description: `
The user deposits money onto a season ticket.

Bonus rules:
• deposit ≤ 500 → bonus = 0
• 500 < deposit ≤ 1000 → bonus = 10%
• deposit > 1000 → bonus = 20%

Print:
bonus: X final: Y
(two decimal places)
  `,
    tests: [
      { input: "400", expected: "bonus: 0.00 final: 400.00" },
      { input: "800", expected: "bonus: 80.00 final: 880.00" },
      { input: "1500", expected: "bonus: 300.00 final: 1800.00" }
    ]
  },

  {
    id: 14,
    difficulty: "⭐ Easy",
    title: "Inheritance Split 2:3:4",
    description: `
A father leaves n CZK to three daughters.
They divide it in the ratio 2 : 3 : 4.

youngest = 2/9 of n
middle   = 3/9 of n
oldest   = 4/9 of n

Input:
n

Output:
youngest: A middle: B oldest: C
  `,
    tests: [
      { input: "9000", expected: "youngest: 2000 middle: 3000 oldest: 4000" },
      { input: "18000", expected: "youngest: 4000 middle: 6000 oldest: 8000" }
    ]
  },

  {
    id: 15,
    difficulty: "⭐ Easy",
    title: "Character Classification",
    description: `
Read one character and classify it as:
• UPPERCASE
• LOWERCASE
• DIGIT
• OTHER
  `,
    tests: [
      { input: "A", expected: "UPPERCASE" },
      { input: "z", expected: "LOWERCASE" },
      { input: "5", expected: "DIGIT" },
      { input: "#", expected: "OTHER" }
    ]
  },

  {
    id: 16,
    difficulty: "⭐ Easy",
    title: "Quarter of the Year",
    description: `
Given a date (day month year), print the quarter:

Q1 = Jan–Mar
Q2 = Apr–Jun
Q3 = Jul–Sep
Q4 = Oct–Dec
  `,
    tests: [
      { input: "15 2 2024", expected: "Q1" },
      { input: "1 4 2024", expected: "Q2" },
      { input: "30 9 2024", expected: "Q3" },
      { input: "31 12 2024", expected: "Q4" }
    ]
  },

  {
    id: 17,
    difficulty: "⭐ Easy",
    title: "Linear Sequence with Step",
    description: `
Print numbers starting at 'start',
adding 'step' each time,
and stopping before exceeding 'limit'.

Output numbers separated by ", ".

Example:
1 2 7 -> 1, 3, 5, 7

  `,
    tests: [
      { input: "1 3 14", expected: "1, 4, 7, 10, 13" },
      { input: "5 2 15", expected: "5, 7, 9, 11, 13, 15" }
    ]
  },
 
  {
    id: 18,
    difficulty: "⭐ Easy",
    title: "Minutes Between Two Times",
    description: `
Given two times (hour:minute), 
compute how many minutes passed from the first time to the second.

Assume both times are on the same day 
and the second time is later or equal.

Input:
h1 m1 h2 m2

Output:
X minutes
    `,
    tests: [
      { input: "9 30 11 15", expected: "105 minutes" },
      { input: "10 00 10 00", expected: "0 minutes" },
      { input: "8 15 9 00", expected: "45 minutes" }
    ]
  },

  {
    id: 19,
    difficulty: "⭐ Easy",
    title: "Print Array Backward",
    description: `
You are given exactly 10 integers.

Print them from last to first, also separated by spaces.

Input:
a1 a2 ... a10

Output:
a10 ... a2 a1
    `,
    tests: [
      { input: "1 2 3 4 5 6 7 8 9 10", expected: "10 9 8 7 6 5 4 3 2 1" },
      { input: "5 5 5 5 5 1 2 3 4 9", expected: "9 4 3 2 1 5 5 5 5 5" }
    ]
  },

  {
    id: 20,
    title: "Maximum Element in an Array",
    description: `
Read n integers and print the maximum value.

Input:
n followed by n integers

Output:
max: X
    `,
    tests: [
      { input: "5 1 3 2 9 4", expected: "max: 9" },
      { input: "3 -5 -2 -10", expected: "max: 3" }
    ]
  },
  
  {
    id: 21,
    difficulty: "⭐ Easy",
    title: "Validate Integer String",
    description: `
Decide whether the given string is a valid integer.

Rules:
• Optional leading '-' is allowed.
• The rest must be digits only.
If valid, print: "valid integer".
If invalid, print: "error at position i: c"
where i is 1-based index of the first invalid character
and c is that character.

Input:
string

Examples:
25 → valid integer
-1698 → valid integer
2a5 → error at position 2: a
    `,
    tests: [
      { input: "25", expected: "valid integer" },
      { input: "-1698", expected: "valid integer" },
      { input: "-3b4", expected: "error at position 3: b" },
      { input: "a25", expected: "error at position 1: a" }
    ]
  },

  {
    id: 22,
    title: "Text Stats and Palindrome Check",
    description: `
Given a text (single line), print:

1) number of characters
2) number of words (words separated by spaces)
3) the text reversed
4) whether it is a palindrome (ignoring spaces)

Output format: chars: X words: Y reversed: ... palindrome: YES|NO
    `,
    tests: [
      {input: "krk", expected: "chars: 3 words: 1 reversed: krk palindrome: YES"},
      {input: "ahoj svete", expected: "chars: 10 words: 2 reversed: etevs joha palindrome: NO"}
    ]
  },
  {
    id: 23,
    title: "Average of Integer Array",
    description: `
Given a list of integers, compute the average value.
Input: numbers separated by spaces.
Output: average (exactly 2 digits after the decimal point)
    `,
    tests: [
      { input: "1 2 3 4 5", expected: "3.00" },
      { input: "10 21 32 43", expected: "26.50" }
    ]
  },

  {
    id: 24,
    title: "Sort Words by Length",
    description: `
Given a list of words, sort them by length from shortest to longest.
If two words have the same length, keep their original order.
Output: words separated by spaces.
    `,
    tests: [
      { input: "a bb ccc", expected: "a bb ccc" },
      { input: "pear fig watermelon", expected: "fig pear watermelon" },
      { input: "ai will be back", expected: "ai be will back" }
    ]
  },

  {
    id: 25,
    title: "Average and Maximum of Decimals",
    description: `
Given decimal numbers, compute:
• average value
• maximum value

Output: avg: X max: Y
Exactly 2 digits after the decimal point
    `,
    tests: [
      { input: "1.5 2.5 3.0", expected: "avg: 2.33 max: 3.00" },
      { input: "10.1 5.5", expected: "avg: 7.80 max: 10.10" }
    ]
  },

  {
    id: 26,
    title: "Contains Duplicate",
    description: `
Given exactly 10 integers, 
determine whether the array contains any repeated value.

Output: YES or NO.
    `,
    tests: [
      { input: "1 2 3 4 5 6 7 8 9 1", expected: "YES" },
      { input: "1 2 3 4 5 6 7 8 9 10", expected: "NO" }
    ]
  },

  {
    id: 27,
    difficulty: "⭐ Easy",
    title: "Count Letter A",
    description: `
Given a sentence, count how many times the letter 'a' or 'A' appears.

Output:
count: X
  `,
    tests: [
      { input: "Ahoj jak se mas", expected: "count: 3" },
      { input: "Bez a to nejde", expected: "count: 1" }
    ]
  },

  {
    id: 28,
    difficulty: "⭐ Easy",
    title: "Sort Integers Descending",
    description: `
Given integers, sort them from largest to smallest.
Output the numbers separated by spaces.
  `,
    tests: [
      { input: "1 5 3 2", expected: "5 3 2 1" },
      { input: "10 9 8", expected: "10 9 8" }
    ]
  },

  {
    id: 29,
    difficulty: "⭐ Easy",
    title: "Longest Word",
    description: `
Given words, print the longest one.
If multiple words have the same length, print the first.
  `,
    tests: [
      { input: "cat dog elephant", expected: "elephant" },
      { input: "hi hello hey", expected: "hello" },
      { input: "he is the best of them", expected: "best" }
    ]
  },

  {
    id: 30,
    difficulty: "⭐ Easy",
    title: "Palindrome Word",
    description: `
Given a single word, print YES if it is a palindrome,
otherwise print NO.
  `,
    tests: [
      { input: "level", expected: "YES" },
      { input: "hello", expected: "NO" }
    ]
  },

  {
    id: 31,
    difficulty: "⭐⭐ Medium",
    title: "Second Smallest and Second Largest",
    description: `
Given integers, find:
• the second smallest value
• the second largest value

Output:
secondMin: X secondMax: Y
  `,
    tests: [
      { input: "1 2 3 4 5", expected: "secondMin: 2 secondMax: 4" },
      { input: "10 20 30 40", expected: "secondMin: 20 secondMax: 30" }
    ]
  },

  {
    id: 32,
    difficulty: "⭐ Easy",
    title: "Sum Two Arrays",
    description: `
Given two arrays of equal length, output a new array where each element
is the sum of elements at the same index.

Input format:
a1 a2 a3 | b1 b2 b3
  `,
    tests: [
      { input: "1 2 3 | 4 5 6", expected: "5 7 9" },
      { input: "10 10 | 1 2", expected: "11 12" }
    ]
  },

  {
    id: 33,
    difficulty: "⭐ Easy",
    title: "Most Vowels in a Word",
    description: `
Given words, find the one with the most vowels (a,e,i,o,u).
If tied, return the first.
  `,
    tests: [
      { input: "cat tree audio", expected: "audio" },
      { input: "sky why try", expected: "sky" }
    ]
  },

  {
    id: 34,
    difficulty: "⭐ Easy",
    title: "Round Decimals",
    description: `
Given decimal numbers, round each to the nearest integer.
Output the rounded numbers separated by spaces.
  `,
    tests: [
      { input: "1.2 2.8 3.5", expected: "1 3 4" },
      { input: "10.49 10.5", expected: "10 11" }
    ]
  },

  {
    id: 35,
    difficulty: "⭐ Easy",
    title: "Count Words Starting with Letter",
    description: `
Input format:
letter | list of words

Count how many words start with the given letter (case-insensitive).

Output:
count: X
  `,
    tests: [
      { input: "a | apple ant boat", expected: "count: 2" },
      { input: "b | ball bat apple", expected: "count: 2" }
    ]
  },

  {
    id: 36,
    difficulty: "⭐ Easy",
    title: "Count Even and Odd",
    description: `
Given integers, count how many are even and how many are odd.

Output:
even: X odd: Y
  `,
    tests: [
      { input: "1 2 3 4 5", expected: "even: 2 odd: 3" },
      { input: "2 4 6 8", expected: "even: 4 odd: 0" }
    ]
  },

  {
    id: 37,
    difficulty: "⭐ Easy",
    title: "Reverse Words Array",
    description: `
Given words, print them in reverse order.
  `,
    tests: [
      { input: "one two three", expected: "three two one" },
      { input: "a b c", expected: "c b a" }
    ]
  },

  {
    id: 38,
    difficulty: "⭐⭐ Medium",
    title: "Sum Arrays by Index or Reverse",
    description: `
Two arrays of equal length.

Mode 1: sum by index  
Mode 2: sum first of A with last of B

Input format:
mode | A | B

Output: sums separated by spaces.

Example: 2 | 3 2 1 | 1 2 3 -> 6 4 2
  `,
    tests: [
      { input: "1 | 1 2 3 | 4 5 6", expected: "5 7 9" },
      { input: "2 | 1 2 3 | 4 5 6", expected: "7 7 7" }
    ]
  },

  {
    id: 39,
    difficulty: "⭐⭐ Medium",
    title: "Most Vowels and Most Consonants",
    description: `
Given words, find:
• the word with the most vowels
• the word with the most consonants
If tied, return the first.

Output:
vowels: WORD consonants: WORD
  `,
    tests: [
      { input: "cat tree audio", expected: "vowels: audio consonants: tree" },
      { input: "sky rhythm why", expected: "vowels: sky consonants: rhythm" }
    ]
  },

  {
    id: 40,
    difficulty: "⭐ Easy",
    title: "Power by Array Length",
    description: `
Given integers, compute value^length for each element,
where length is the number of elements in the array.

Output the results separated by spaces.
  `,
    tests: [
      { input: "1 2 3", expected: "1 8 27" },
      { input: "2 2 2 2", expected: "16 16 16 16" }
    ]
  },

  {
    id: 41,
    difficulty: "⭐ Easy",
    title: "Split Positives and Negatives",
    description: `
Given integers, split them into:
• non-negative numbers (>= 0)
• negative numbers

Output:
pos: ... neg: ...

Example:
-2 0 1 -1 -> pos: 0 1 neg: -2 -1
  `,
    tests: [
      { input: "1 -2 3 0 -5", expected: "pos: 1 3 0 neg: -2 -5" },
      { input: "-1 -2 -3", expected: "pos: neg: -1 -2 -3" }
    ]
  },

  {
    id: 42,
    difficulty: "⭐ Easy",
    title: "Count Above Average",
    description: `
Given integers, 
compute the average and count how many values are above it.

Output:
count: X
  `,
    tests: [
      { input: "1 2 3 4 5", expected: "count: 2" },
      { input: "10 10 10", expected: "count: 0" }
    ]
  }

];