package com.TicketBooking.entities;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;

@Builder
@Data
@AllArgsConstructor
@NoArgsConstructor
@Document(collection = "tickets")
public class Ticket {
    private String id;
    private LocalDateTime expiryTime;
    private int usageCount;
    private int price;
    private String startStation;
    private String endStation;
}
