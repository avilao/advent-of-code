import { readFile } from '../utils/filesystem';
import { getLayerWithFewerDigits, getMessage } from './08';

const input = readFile('08.input', import.meta.url);

describe('2019 08', () => {
  it('A', () => {
    expect(getLayerWithFewerDigits(input)).toBe(1596);
  });

  it('B', () => {
    expect(getMessage(input)).toBe(`
#    ###  ###   ##  #### 
#    #  # #  # #  # #    
#    ###  #  # #    ###  
#    #  # ###  #    #    
#    #  # # #  #  # #    
#### ###  #  #  ##  #### 
`);
  });
});
