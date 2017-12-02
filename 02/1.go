// Reading and writing files are basic tasks needed for
// many Go programs. First we'll look at some examples of
// reading files.

package main

import (
	"bufio"
	"fmt"
	"os"
	"strconv"
	"strings"
)

// Reading files requires checking most calls for errors.
// This helper will streamline our error checks below.
func check(e error) {
	if e != nil {
		panic(e)
	}
}

func main() {

	file, err := os.Open("./input.txt")
	defer file.Close()

	reader := bufio.NewReader(file)
	check(err)

	var line string
	var numbers []string
	var min, max, sum int64

	sum = 0
	for {
		line, err = reader.ReadString('\n')

		numbers = strings.Split(line, " ")
		//fmt.Printf(" > Read %s characters\n", line)

		min = 99999999999
		max = 0
		for i := 0; i < len(numbers); i++ {
			n, er := strconv.ParseInt(strings.Replace(numbers[i], "\r\n", "", -1), 10, 0)
			check(er)

			if n < min {
				min = n
			}

			if n > max {
				max = n
			}
		}
		sum += (max - min)

		if err != nil {
			break
		}
	}

	fmt.Print(sum)
}
