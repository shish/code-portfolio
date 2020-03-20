#!/bin/sh
./assets/extract_thumbs `find -name "*.html"`
./assets/extract_thumbs `find -name "*.shtml"`

for n in `ls -1 context/*xample* context/*himmie*.php | grep -v html` ; do
	echo pygmentize -o $n.html $n
	/usr/bin/pygmentize -o $n.html $n
done
