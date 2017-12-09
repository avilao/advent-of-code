package main

import "fmt"
import "os"
import "bufio"

func main() {
	reader := bufio.NewReader(os.Stdin)

	sum := 0
	depth := 0
	inGarbage := false
	ignoreNext := false
	cleaned := 0

	for {
		c, err := reader.ReadByte()

		if err != nil {
			break
		}

		if ignoreNext {
			ignoreNext = false
			continue
		}

		if c == '!' {
			ignoreNext = true
			continue
		}

		if inGarbage && c == '>' {
			inGarbage = false
			continue
		}

		if inGarbage {
			cleaned++
		}

		if !inGarbage {
			if c == '<' {
				inGarbage = true
				continue
			}

			if c == '{' {
				depth++
				sum += depth
			}

			if c == '}' {
				depth--
			}
		}
	}
	fmt.Println(sum, cleaned)
}
