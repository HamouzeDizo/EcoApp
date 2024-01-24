package uiass.eia.myapi.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.ManyToAny;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Commande {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    private String adresse;
    private LocalDate commandeDate;
    private LocalDate deliveryDate;
//    @OneToMany(mappedBy = "commande", cascade = CascadeType.ALL, orphanRemoval = true)
//    private List<DetailCommande> details = new ArrayList<>();
    private long idClient;

}
