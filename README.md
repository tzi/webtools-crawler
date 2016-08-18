WebTools Crawler
======

A cli tool to browse [WebToolsWeekly](http://webtoolsweekly.com/) archives


Usage
------

```sh
# See tools from the last issue (and the previous ones iteratively)
./webtools.js 

# See tools from a specific issue
./webtools.js -i 86

# See matching tools from the last issue (and the previous ones iteratively)
./webtools.js <regex>

# See matching tools from a specific issue
./webtools.js -i 86 <regex>
```


Installation
------

```sh
git clone git@github.com:tzi/webtools-crawler.git
npm i
```


Examples
------

```
$ ./webtools.js bem
Issue 160: No matching result
Issue 159: No matching result
Issue 158: No matching result

Issue 157
======

Avalanche
	 "Superclean, powerful, responsive, Sass-based, BEM-syntax CSS grid system."
	 https://github.com/colourgarden/avalanche

SassBlocks
	 "Introduces a pattern to make working with BEM-blocks/modules in Sass/SCSS a little more OOP."
	 https://github.com/djfarly/sass-blocks
	 
Next issue (ynq)?
```

```
$ ./webtools.js -i 138 bem

Issue 138
======

_bemify
	 "A set of Sass mixins to write well-structured, maintainable, idiomatic BEM-style .scss."
	 http://franzheidl.github.io/bemify/
```


Author & Community
--------

WebTools Crawler is under [MIT License](http://opensource.org/licenses/MIT)

This tool is created by [Thomas ZILLIOX](http://tzi.fr)

The WebToolsWeekly newsletter is curated by [Louis Lazaris](https://twitter.com/ImpressiveWebs)

