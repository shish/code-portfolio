from time import sleep



def function_a():
    print("hello")
    sleep(0.5)


def function_b():
    print("world")
    sleep(0.1)


def main():
    function_a()
    function_b()

if __name__ == "__main__":
    main()
