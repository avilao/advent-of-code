package main
import "fmt"
import "os"
import "bufio"
import "strings"

var s []string
	
func main(){
// your code goes here
	scanner := bufio.NewScanner(os.Stdin)

	g := make(map[string][]string)
	


	for scanner.Scan() {
		s := scanner.Text()

		key := ""
		i := 0

		for _, n := range strings.Fields(s) {
			if i == 0 {
				key = n
			}

			if i >= 2 {
				sTmp := strings.Replace(n, ",", "", -1)
				g[key] = append(g[key], sTmp)
			}

			i++
		}

	}
	
	searchNode("0", g)
	
		
	fmt.Println(len(s))
}


func searchNode(key string, g map[string][]string) {

	s = append(s, key)
	
	
	for _, k:= range g[key] {
		if !contains(k, s) {
			searchNode(k,g)
		}
	}
	

	
}

func contains(key string, a []string) bool {

	for _, v := range a {
	
		if key == v {
			return true
		}
	}

	return false
}


