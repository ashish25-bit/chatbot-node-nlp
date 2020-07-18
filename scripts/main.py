import sys
from chat import response

if __name__ == "__main__":
    # if there are multiple arguments 
    # st = sys.argv[1:]
    # inputSen = listToStr = ' '.join([str(s) for s in st]) 
    sentence = sys.argv[1] 
    res = response(sentence)
    print(res)