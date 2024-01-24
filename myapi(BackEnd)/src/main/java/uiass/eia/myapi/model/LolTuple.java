package uiass.eia.myapi.model;


public class LolTuple<A, B> {
    private final A first;
    private final B second;

    public LolTuple(A first, B second) {
        this.first = first;
        this.second = second;
    }

    public A getFirst() {
        return first;
    }

    public B getSecond() {
        return second;
    }
}
