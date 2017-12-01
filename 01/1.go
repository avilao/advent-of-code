// Reading and writing files are basic tasks needed for
// many Go programs. First we'll look at some examples of
// reading files.

package main

import (
	"fmt"
	"io/ioutil"
)

// Reading files requires checking most calls for errors.
// This helper will streamline our error checks below.
func check(e error) {
	if e != nil {
		panic(e)
	}
}

func main() {

	// Perhaps the most basic file reading task is
	// slurping a file's entire contents into memory.
	str, err := ioutil.ReadFile("./input.txt")
	check(err)
	//fmt.Print(string(dat))

	l := len(str)

	//fmt.Print(l)

	sum := 0
	for i := 0; i < l; i++ {
		if str[i] == str[(i+1)%l] {
			sum += int(str[i]) - 48
		}
	}

	fmt.Print(sum)
}
