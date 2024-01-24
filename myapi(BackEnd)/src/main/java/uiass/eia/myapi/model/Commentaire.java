package uiass.eia.myapi.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Commentaire {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    private String userName;
    private LocalDate date;
    private String comment;
    private long idClient;
    private long idProduct;

    @Override
    public String toString() {
        return "date: "+this.date+" comment: "+this.comment+" this.idC: "+this.idClient+" idP: "+this.idProduct;
    }
}
