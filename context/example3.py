import context.api as ctx

# your program as normal goes here

if __name__ == "__main__":
    ctx.set_log("file://example.ctxt")
    ctx.set_profile(True)
    main()
