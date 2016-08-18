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