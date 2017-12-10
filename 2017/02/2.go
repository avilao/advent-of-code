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
	var str []string

	sum := 0
	for {
		line, err = reader.ReadString('\n')

		str = strings.Split(line, " ")

		nums := make([]int, len(str))

		// convert string
		for i, v := range str {
			nums[i], err = strconv.Atoi(strings.Replace(v, "\r\n", "", -1))

			if err != nil {
				//proper err handling
				//either b[i] = -1 (in case positive integers)
			}
		}

		for j := 0; j < len(nums)-1; j++ {
			for k := j + 1; k < len(nums); k++ {
				if nums[k] != 0 && nums[j] != 0 {
					if nums[k]%nums[j] == 0 {
						sum += (nums[k] / nums[j])
					}
					if nums[j]%nums[k] == 0 {
						sum += nums[j] / nums[k]
					}
				}
			}
		}

		if err != nil {
			break
		}
	}

	fmt.Println(sum)
}
