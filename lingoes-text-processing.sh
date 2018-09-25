#!/bin/bash

file='./_posts/temp.md'
filename=$(basename $file .md)

# debug
cp ./_posts/temp-2.md $file

process_substrings () {
  cat $1 | while read line
  do
     oneline=${line}
     while :
     do
       string=${oneline#*Find: }
       string=${string%%\" class=ref*}
       regex='.*Find: '${string}
       #echo $regex
       index=`expr match "$oneline" "$regex"`
       if [ "$index" -le 0 ]
       then
         break
       fi
       oneline=${oneline:${index}}
       validated="${string// /\%20}" # " " -> "%20"
       regex2='<A title.*\/'$validated'"><U>'
       echo $regex2
       sed -i -e "s/${regex2}/<U>/" $file # if have two instances (in light), it will delete too long
     done
  done
}
#regex='<A title.\(.\{8\}\)'+$filename+'.\(.\{62\}\)'+$filename
regex='<A title.*<U>'
word="$(echo "$1" | sed 's/.*/\u&/')"
head='---\nlayout: post\ntitle:  "'$word'"\ncategories: undefined\ntag: good\n---'
#echo $regex
echo $head

if [ -e "$file" ]; then
  sed -i '/<DIV id=dict_EA8BE1CEC6BCAD41A4BAF7705F2AF5E6/{N;N;N;N;N;N;N;N;N;N;d;}' $file
  sed -i '1,305 {d}' $file
  sed -i 's/<IMG\(.\{155\}\)[0-9]\+.png">/*/g' $file
  sed -i 's/<IMG\(.\{155\}\)[a-z].png">/*/g' $file
  sed -i 's/<IMG.*height=11>//g' $file
  sed -i 's/<FONT\(.\{15\}\)//g' $file
  sed -i 's/face="Lingoes Unicode">//g' $file
  sed -i 's/<\/FONT>//g' $file
  #sed -i -e "s/${regex}/<U>/g" $file #delete too much
  process_substrings $file
  sed -i 's/<\/A>//g' $file
  sed -i 's/<\/DIV><\/DIV><\/DIV><\/DIV><\/DIV><\/DIV>//g' $file
  sed -i 's/<\/DIV><\/DIV>//g' $file
  #sed -i '/<DIV style="WIDTH: 100%; MARGIN: 5px 0px 0px">/{N;d;}' $file
else
  echo "File does not exist"
fi

yesterday=$(date --date="1 days ago" +%Y-%m-%d)
sed -e "1i ${head}" $file > './_posts/'$yesterday'-'$1'.md'
#cp $file $yesterday'-'$1'.md'
