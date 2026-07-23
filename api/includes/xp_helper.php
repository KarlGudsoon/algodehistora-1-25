<?php

/**
 * Otorga XP a un usuario por una acción específica, evitando duplicados
 * mediante la UNIQUE KEY (user_id, accion, referencia) de xp_historial.
 * Devuelve el XP otorgado (0 si ya se había otorgado antes por esta referencia).
 */
function otorgarXP(PDO $pdo, int $userId, string $accion, string $referencia): int {
    $stmt = $pdo->prepare('SELECT xp_otorgado FROM xp_configuracion WHERE accion = ?');
    $stmt->execute([$accion]);
    $config = $stmt->fetch();

    if (!$config) {
        return 0;
    }

    $xp = (int) $config['xp_otorgado'];

    try {
        $stmt = $pdo->prepare('
            INSERT INTO xp_historial (user_id, accion, referencia, xp_otorgado)
            VALUES (?, ?, ?, ?)
        ');
        $stmt->execute([$userId, $accion, $referencia, $xp]);
    } catch (PDOException $e) {
        if ($e->getCode() == 23000) {
            return 0; // ya se había otorgado antes por esta misma referencia
        }
        throw $e;
    }

    $stmt = $pdo->prepare('
        INSERT INTO usuario_experiencia (user_id, xp_total)
        VALUES (?, ?)
        ON DUPLICATE KEY UPDATE xp_total = xp_total + VALUES(xp_total)
    ');
    $stmt->execute([$userId, $xp]);

    return $xp;
}

/**
 * Calcula el nivel actual y el progreso hacia el siguiente,
 * a partir del XP total. No se guarda nivel en ninguna tabla:
 * siempre se deriva matemáticamente desde xp_total.
 */
function calcularNivel(int $xpTotal): array {
    $nivel = 1;
    $xpRequeridoAcumulado = 0;
    $xpParaSiguienteNivel = 100;

    while ($xpTotal >= $xpRequeridoAcumulado + $xpParaSiguienteNivel) {
        $xpRequeridoAcumulado += $xpParaSiguienteNivel;
        $nivel++;
        $xpParaSiguienteNivel = (int) round($xpParaSiguienteNivel * 1.25);
    }

    $xpEnNivelActual = $xpTotal - $xpRequeridoAcumulado;

    return [
        'nivel' => $nivel,
        'xp_total' => $xpTotal,
        'xp_en_nivel_actual' => $xpEnNivelActual,
        'xp_para_siguiente_nivel' => $xpParaSiguienteNivel,
        'porcentaje_nivel' => $xpParaSiguienteNivel > 0
            ? round(($xpEnNivelActual / $xpParaSiguienteNivel) * 100)
            : 0,
    ];
}