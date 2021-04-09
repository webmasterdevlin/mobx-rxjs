

[comment]: <> (    useEffect&#40;&#40;&#41; => {)

[comment]: <> (        get<any[]>&#40;'posts'&#41;)

[comment]: <> (            .pipe&#40;)

[comment]: <> (                tap&#40;&#40;val&#41; => console.log&#40;'VAL::', val&#41;&#41;,)

[comment]: <> (                map&#40;&#40;res&#41; => {)

[comment]: <> (                    setPosts&#40;res&#41;;)

[comment]: <> (                    return console.log&#40;'RESPONSE::', res&#41;;)

[comment]: <> (                }&#41;)

[comment]: <> (            &#41;)

[comment]: <> (            .subscribe&#40;&#41;;)

[comment]: <> (    }, []&#41;;)


