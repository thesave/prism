Prism.languages.jolie = Prism.languages.extend('clike', {
	'keyword': /\b(?:include|define|is_defined|undef|main|init|outputPort|inputPort|Location|Protocol|Interfaces|RequestResponse|OneWay|type|interface|extender|throws|cset|csets|forward|Aggregates|Redirects|embedded|courier|extender|execution|sequential|concurrent|single|scope|install|throw|comp|cH|default|global|linkIn|linkOut|synchronized|this|new|for|if|else|while|in|Jolie|Java|Javascript|nullProcess|spawn|constants|with|provide|until|exit|foreach|instanceof|over|service)\b/g,
	'builtin': /\b(?:undefined|string|int|void|long|Byte|bool|double|float|char|any)\b/,
	'number': /\b(?:\b\d*\.?\d*(e[+-]?\d*)?[l]?)\b/i,
	'operator': /->|<<|=<|=>|[!+->=]?=|<|>|!|&&|\|\||\?|\*|\/|%|--?|\+\+?|\^/g,
	'symbol': /[|;@?:]/,
	'punctuation': /[{}[\]().]/,
	'string': /(""")[\W\w]*?\1|("|\/)[\W\w]*?\2|('.')/g
});

delete Prism.languages.jolie['class-name'];
delete Prism.languages.jolie['function'];

Prism.languages.insertBefore( 'jolie', 'keyword', {
	'function':
	{
		pattern: /(?:(?:\b(outputPort|@|inputPort|in|service|courier)\b))[A-Za-z0-9_]+/g,
		lookbehind: true
	},
	'aggregates': {
		pattern: /(?:(?:(\bAggregates\b[\n\r\s]*:[\n\r\s]*)))([A-Za-z0-9_]+[\n\r\s]*(with[\n\r\s]*[A-Za-z0-9_]+)?,[\n\r\s]*)*[A-Za-z0-9_]+([\n\r\s]*with[\n\r\s]*[A-Za-z0-9_]+)?/,
		lookbehind: true,
		inside: {
			'withExtension': {
				pattern: /\bwith\b[\n\r\s]+[A-Za-z0-9_]+/,
				inside: {
					'keyword' : /\bwith\b/
				}
			},
			'function': {
				pattern: /[A-Za-z0-9_]+/
			}
		}
	},
	'redirects': {
		pattern: /(?:(?:(\bRedirects\b[\n\r\s]*:[\n\r\s]*)))([A-Za-z0-9_]+[\n\r\s]*=>[\n\r\s]*[A-Za-z0-9_]+[\n\r\s]*,[\n\r\s]*)*[A-Za-z0-9_]+[\n\r\s]*=>[\n\r\s]*[A-Za-z0-9_]+/,
		lookbehind: true,
		inside: {
			'function': {
				pattern: /[A-Za-z0-9_]+/g
			},
			'operator': {
				pattern: /=>/g
			}
		}
	}
});