export default class ReadableRegex{
	constructor(){
		this.elements = '';
	}
	startsWith(value){
		this.elements = '^' + value + this.elements;
		let x = /^Lorem/;
	}
}


/*
Patterns:
Brackets:
	[...] (e.g. [abc]) -> find ANY character between the brackets
	[^...] (e.g. [^abc]) -> find ANY character NOT between the brackets
	[0-9] -> find any character between the brackets (for example [0-5], [a-z], [a-zA-Z])
	(x|y) -> find any of the alternatives (e.g. (3|6), (5|7|2), (1-5 | 8))
Metachars:
	. -> single character wildcard (execludes newline characters unless flag s is set)
	\w -> find a word character (a-z, A-Z, 0-9, _)
	\W -> find a NON-word character
	\d -> find a digit character (0-9)
	\D -> find a NON-digit character
	\s -> find a whitespace character
	\S -> find a NON-whitespace character
	\b -> match at beginning or end of a word (\bLO matches at beginning, LO\b matches at end)
	\B -> match NOT at beginning or end of a word
	\0 -> find a NULL character
	\n -> find a newline character
	\f -> find a form feed character
	\r -> find a carriage return character
	\t -> find a tab character
	\v -> find a vertical tab character
	\xxx (e.g. \127) -> find a character with octal number xxx
	\xdd (e.g. \x57) -> find a character with hexadecimal number dd
	\uxxxx (e.g. \u0057) -> find a character with unicode hexadecimal value xxxx
Quantifiers:
	n+ -> contains at least 1 n
	n* -> contains 0 or more n's
	n? -> contains 0 or 1 n
	n{x} -> contains exactly x n's
	n{x,y} -> contains between x and y n's (inclusive)
	n{x,} -> contains at least x n's
	n$ -> ends with n
	^n -> starts with n
	?=n -> directly followed with n
	?! -> NOT directly followed with n

Flags:
d -> indices = generate indices for substring matches
g -> global = find all matches
i -> insensitive = not case sensitive
m -> multiline = ^ and $ match start and end of line
s -> dotall = the dot (single character wildcard) also matches newline characters
u -> unicode = interpret Unicode code point escapes as Unicode instead of literal characters
y -> sticky = start searching from the lastIndex property instead of the beginning
) 

*/