#!/bin/bash

file='./_posts/temp.md'
filename=$(basename $file .md)

# debug
#cp ./_posts/temp-2.md $file

process_substrings() {
  index=0
  while read -r line
  do
    array[index++]=$(echo "$line" | grep -o "Find: [a-z]\+")
    array[index++]=$(echo "$line" | grep -o "Find: [a-z]\+\-[a-z]\+")
    #array[index++]=$(echo "$line" | grep -o "Find: [a-z]\+\ [a-z]\+")
  done < $1
  #echo ${array[*]}
  for string in ${array[@]}; do
    if [ "$string" != "Find:" ]
    then
      #let length=${#string}+70
      regex="<A title=\"Find: ${string}\" class=ref "
      #echo $regex
      sed -i -e "s/${regex}/<A /" $file
    fi
  done
}

process_substrings_ex () {
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
       #validated="${string// /\%20}" # " " -> "%20"
       # <A title="Find: traffic lights" class=ref href="dict://key.D4722835273E184582F2D24696A738EA/traffic%20lights"><U>
       #let length=${#string}+70
       #echo $string":"$length
       regex2="<A title=\"Find: ${string}\" class=ref "
       #echo $regex2
       sed -i -e "s/${regex2}/<A /" $file
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
  sed -i 's/dict:\/\/key\.D4722835273E184582F2D24696A738EA\//\{\{ site\.baseurl \}\}\//g' $file
  #sed -i -e "s/${regex}/<U>/g" $file #delete too much
  process_substrings $file
  #sed -i 's/<\/A>//g' $file
  sed -i 's/<\/DIV><\/DIV><\/DIV><\/DIV><\/DIV><\/DIV>//g' $file
  sed -i 's/<\/DIV><\/DIV>//g' $file
  process_substrings_ex $file
  #sed -i '/<DIV style="WIDTH: 100%; MARGIN: 5px 0px 0px">/{N;d;}' $file
else
  echo "File does not exist"
fi

yesterday=$(date --date="1 days ago" +%Y-%m-%d)
sed -e "1i ${head}" $file > './_posts/'$yesterday'-'$1'.md'
#cp $file $yesterday'-'$1'.md'
