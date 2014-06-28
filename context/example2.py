from time import sleep
import context.api as ctx

@ctx.log("Printing hello")
def function_a():
    print("hello")
    sleep(0.5)

@ctx.log("Printing world")
def function_b():
    print("world")
    sleep(0.1)

@ctx.log("Main loop", bookmark=True)
def main():
    function_a()
    function_b()

if __name__ == "__main__":
    ctx.set_log("file://example.ctxt")
    main()
