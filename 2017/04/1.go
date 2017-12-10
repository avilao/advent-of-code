package main
import "fmt"
import "os"
import "bufio"
import "strings"

func main(){
	// your code goes here
	//var m map[string]int
	scanner := bufio.NewScanner(os.Stdin)
	sum := 0
	
	for scanner.Scan() {
		s := scanner.Text()
		
		m := make(map[string]int)
		for _, n := range strings.Fields(s) {
			m[n]++
		}
		
		if containsDuplicate(m) {
			sum++
		}
	}
	
	fmt.Print(sum)
	 
}

func containsDuplicate(m map[string]int) bool{
	for _, x := range m{
		if x>1 {
			return true
		}
	}
	return false
}